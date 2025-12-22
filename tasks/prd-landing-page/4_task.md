# [4.0] Implementar área de contato (mailto + copiar e-mail) (S)

## Objetivo
- Criar seção de contato com CTA para `mailto:contato@gastandoya.com.br` e opção de copiar e-mail.

## Subtarefas
- [ ] 4.1 Criar componente `ContactSection` com headline e descrição
- [ ] 4.2 Adicionar botão/link `mailto:contato@gastandoya.com.br`
- [ ] 4.3 Adicionar botão "Copiar e-mail" usando Clipboard API
- [ ] 4.4 Feedback visual ao copiar (toast ou mudança de texto)
- [ ] 4.5 Integrar seção na página principal (final da landing)

## Critérios de Sucesso
- Botão mailto abre cliente de e-mail.
- Botão copiar funciona e dá feedback.
- Seção é visualmente clara e acessível.

## Dependências
- Tarefa 3.0 concluída (seções anteriores).

## Observações
- Considerar fallback se Clipboard API não estiver disponível (ex.: selecionar texto).

## status: pending

<task_context>
<domain>frontend</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>low</complexity>
<dependencies>task_3.0</dependencies>
</task_context>

# Tarefa 4.0: Área de contato

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar seção de contato com CTA mailto e opção de copiar e-mail.

<requirements>
- Botão mailto para contato@gastandoya.com.br.
- Botão copiar e-mail com Clipboard API.
- Feedback visual ao copiar.
</requirements>

## Detalhes de Implementação

Seguir padrão visual da landing e usar Clipboard API com fallback.

## Critérios de Sucesso

- mailto funciona.
- Copiar funciona com feedback.

## Arquivos relevantes
- `frontend/src/components/ContactSection.tsx`




