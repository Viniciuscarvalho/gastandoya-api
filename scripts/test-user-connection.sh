#!/bin/bash

# Script para validar conexão Notion de um usuário específico
# Uso: ./scripts/test-user-connection.sh <userId> <databaseId>

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validar argumentos
if [ $# -lt 1 ]; then
    echo "Uso: $0 <userId> [databaseId]"
    echo "Exemplo: $0 121C7EEC-EF08-4A86-B88F-506E77F85208 091438f7-7173-47cd-a240-9e7bea28fff2"
    exit 1
fi

USER_ID=$1
DATABASE_ID=${2:-""}

# Ler API key do .env.local ou solicitar
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

if [ -z "$APP_API_KEY" ]; then
    echo -e "${RED}❌ APP_API_KEY não encontrada no .env.local${NC}"
    read -p "Digite a APP_API_KEY: " APP_API_KEY
fi

# URL base (pode ser local ou produção)
BASE_URL=${NEXT_PUBLIC_BASE_URL:-"http://localhost:3000"}
echo -e "${YELLOW}🔍 Testando conexão para userId: ${USER_ID}${NC}"
echo -e "${YELLOW}📡 Base URL: ${BASE_URL}${NC}"
echo ""

# Teste 1: Verificar se usuário tem conexão Notion
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}Teste 1: Verificando conexão Notion do usuário...${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"

RESPONSE=$(curl -s -w "\n%{http_code}" "${BASE_URL}/api/notion/debug" \
    -H "x-api-key: ${APP_API_KEY}" \
    -H "x-user-id: ${USER_ID}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Usuário possui conexão Notion!${NC}"
    echo ""
    echo "📊 Resposta do servidor:"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
    
    # Extrair databaseId configurado
    CONFIGURED_DB=$(echo "$BODY" | jq -r '.configuredDatabaseId // "Not configured"' 2>/dev/null || echo "Not configured")
    echo ""
    echo -e "${YELLOW}🔑 Database configurado: ${CONFIGURED_DB}${NC}"
    
elif [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}❌ PROBLEMA ENCONTRADO: Usuário NÃO possui conexão Notion!${NC}"
    echo ""
    echo -e "${YELLOW}💡 Solução:${NC}"
    echo "   1. No app iOS, esse usuário precisa fazer OAuth primeiro"
    echo "   2. Abra: ${BASE_URL}/api/notion/oauth/authorize?userId=${USER_ID}"
    echo "   3. Autorize a integração no Notion"
    echo "   4. Depois configure o database"
    echo ""
    exit 1
else
    echo -e "${RED}❌ Erro inesperado (HTTP ${HTTP_CODE}):${NC}"
    echo "$BODY"
    exit 1
fi

# Teste 2: Se databaseId foi fornecido, testar acesso
if [ -n "$DATABASE_ID" ]; then
    echo ""
    echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Teste 2: Testando acesso ao database específico...${NC}"
    echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
    
    RESPONSE=$(curl -s -w "\n%{http_code}" "${BASE_URL}/api/notion/debug?testDatabaseId=${DATABASE_ID}" \
        -H "x-api-key: ${APP_API_KEY}" \
        -H "x-user-id: ${USER_ID}")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$HTTP_CODE" = "200" ]; then
        DB_TEST=$(echo "$BODY" | jq '.databaseTest' 2>/dev/null || echo "{}")
        SUCCESS=$(echo "$DB_TEST" | jq -r '.success // false' 2>/dev/null || echo "false")
        
        if [ "$SUCCESS" = "true" ]; then
            echo -e "${GREEN}✅ Database acessível!${NC}"
            echo ""
            echo "📊 Informações do database:"
            echo "$DB_TEST" | jq '.' 2>/dev/null || echo "$DB_TEST"
            
            # Teste 3: Configurar database
            echo ""
            echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
            echo -e "${YELLOW}Teste 3: Configurando database para o usuário...${NC}"
            echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
            
            RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}/api/notion/config/database" \
                -H "Content-Type: application/json" \
                -H "x-api-key: ${APP_API_KEY}" \
                -H "x-user-id: ${USER_ID}" \
                -d "{\"databaseId\":\"${DATABASE_ID}\"}")
            
            HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
            BODY=$(echo "$RESPONSE" | sed '$d')
            
            if [ "$HTTP_CODE" = "200" ]; then
                echo -e "${GREEN}✅ Database configurado com sucesso!${NC}"
                echo ""
                echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
                
                # Teste 4: Buscar expenses
                echo ""
                echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
                echo -e "${YELLOW}Teste 4: Buscando expenses...${NC}"
                echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
                
                RESPONSE=$(curl -s -w "\n%{http_code}" "${BASE_URL}/api/notion/expenses" \
                    -H "x-api-key: ${APP_API_KEY}" \
                    -H "x-user-id: ${USER_ID}")
                
                HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
                BODY=$(echo "$RESPONSE" | sed '$d')
                
                if [ "$HTTP_CODE" = "200" ]; then
                    COUNT=$(echo "$BODY" | jq 'length' 2>/dev/null || echo "?")
                    echo -e "${GREEN}✅ Expenses recuperadas com sucesso!${NC}"
                    echo ""
                    echo -e "${GREEN}📊 Total de despesas: ${COUNT}${NC}"
                    echo ""
                    echo "Primeiras 3 despesas:"
                    echo "$BODY" | jq '.[0:3]' 2>/dev/null || echo "$BODY"
                else
                    echo -e "${RED}❌ Erro ao buscar expenses (HTTP ${HTTP_CODE}):${NC}"
                    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
                fi
            else
                echo -e "${RED}❌ Erro ao configurar database (HTTP ${HTTP_CODE}):${NC}"
                echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
            fi
            
        else
            echo -e "${RED}❌ PROBLEMA ENCONTRADO: Database NÃO é acessível!${NC}"
            echo ""
            ERROR=$(echo "$DB_TEST" | jq -r '.error // "Unknown"' 2>/dev/null || echo "Unknown")
            HINT=$(echo "$DB_TEST" | jq -r '.hint // ""' 2>/dev/null || echo "")
            
            echo -e "${YELLOW}Erro: ${ERROR}${NC}"
            if [ -n "$HINT" ]; then
                echo -e "${YELLOW}Dica: ${HINT}${NC}"
            fi
            
            echo ""
            echo -e "${YELLOW}💡 Soluções possíveis:${NC}"
            echo "   1. No Notion, abra o database"
            echo "   2. Clique em 'Share' (canto superior direito)"
            echo "   3. Adicione a integração 'GastandoYa' com permissão de leitura"
            echo "   4. Salve e tente novamente"
            echo ""
            echo "   OU"
            echo ""
            echo "   - Verifique se o ID do database está correto"
            echo "   - ID fornecido: ${DATABASE_ID}"
            exit 1
        fi
    else
        echo -e "${RED}❌ Erro inesperado (HTTP ${HTTP_CODE}):${NC}"
        echo "$BODY"
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Todos os testes passaram!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"

