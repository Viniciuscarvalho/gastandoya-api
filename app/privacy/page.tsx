export default function PrivacyPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      color: '#1f2937',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#111827' }}>
        Política de Privacidade - GastandoYa
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        <strong>Última atualização:</strong> Dezembro de 2025
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          1. Introdução
        </h2>
        <p>
          Bem-vindo ao GastandoYa. Esta Política de Privacidade descreve como coletamos, usamos, 
          armazenamos e protegemos suas informações ao utilizar nosso aplicativo móvel e a integração com o Notion.
        </p>
        <p>
          Ao utilizar o GastandoYa, você concorda com a coleta e uso de informações de acordo com esta política.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          2. Informações que Coletamos
        </h2>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          2.1 Informações de Integração com Notion
        </h3>
        <p>Quando você conecta sua conta Notion ao GastandoYa, coletamos:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li><strong>Token de Acesso OAuth:</strong> Token criptografado fornecido pelo Notion após sua autorização</li>
          <li><strong>Workspace ID:</strong> Identificador do seu workspace no Notion</li>
          <li><strong>Database ID:</strong> Identificador do database de despesas que você escolher compartilhar</li>
          <li><strong>ID de Usuário:</strong> Identificador único gerado internamente pelo GastandoYa</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          2.2 Dados de Despesas
        </h3>
        <p>Quando você utiliza a integração com Notion, acessamos:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Descrições de despesas</li>
          <li>Datas de despesas</li>
          <li>Valores monetários</li>
          <li>Categorias de despesas</li>
          <li>Timestamps de criação e atualização</li>
        </ul>
        <p style={{ 
          backgroundColor: '#fef3c7', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          border: '1px solid #fbbf24'
        }}>
          <strong>Importante:</strong> Esses dados são lidos do seu Notion apenas quando você solicita 
          explicitamente a sincronização e são armazenados localmente no seu dispositivo. Não armazenamos 
          permanentemente seus dados de despesas em nossos servidores.
        </p>

        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          2.3 Informações que NÃO Coletamos
        </h3>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Não coletamos informações pessoais identificáveis além do estritamente necessário</li>
          <li>Não acessamos databases ou páginas do Notion além daqueles que você explicitamente compartilha</li>
          <li>Não rastreamos sua atividade no Notion</li>
          <li>Não utilizamos cookies ou tecnologias de rastreamento</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          3. Como Usamos suas Informações
        </h2>
        <p>Utilizamos as informações coletadas exclusivamente para:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li><strong>Autenticação:</strong> Validar sua conexão com o Notion usando o protocolo OAuth 2.0</li>
          <li><strong>Sincronização:</strong> Ler dados de despesas do database configurado no Notion</li>
          <li><strong>Funcionalidade da Aplicação:</strong> Exibir suas despesas no aplicativo móvel</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          4. Armazenamento e Segurança
        </h2>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          4.1 Armazenamento de Tokens
        </h3>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Tokens de acesso do Notion são armazenados de forma criptografada em nosso backend</li>
          <li>Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados</li>
          <li>Os tokens nunca são expostos ao frontend do aplicativo ou a terceiros</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          4.2 Retenção de Dados
        </h3>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Mantemos seus tokens de acesso enquanto sua conexão com o Notion estiver ativa</li>
          <li>Você pode revogar o acesso a qualquer momento através do aplicativo ou do painel do Notion</li>
          <li>Ao desconectar sua conta Notion, todos os tokens são permanentemente deletados de nossos servidores</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          5. Compartilhamento de Informações
        </h2>
        <p style={{ 
          backgroundColor: '#dcfce7', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          border: '1px solid #86efac'
        }}>
          <strong>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros</strong>, exceto:
        </p>
        <ul style={{ marginLeft: '2rem' }}>
          <li><strong>Notion:</strong> Conforme necessário para utilizar a API do Notion</li>
          <li><strong>Requisitos Legais:</strong> Quando exigido por lei, ordem judicial ou processo legal</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          6. Seus Direitos
        </h2>
        <p>Você tem os seguintes direitos em relação aos seus dados:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li><strong>Acesso:</strong> Solicitar informações sobre quais dados armazenamos sobre você</li>
          <li><strong>Correção:</strong> Solicitar correção de dados incorretos</li>
          <li><strong>Exclusão:</strong> Solicitar exclusão de todos os seus dados</li>
          <li><strong>Revogação:</strong> Revogar o acesso do GastandoYa ao seu Notion a qualquer momento</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          7. Lei Geral de Proteção de Dados (LGPD)
        </h2>
        <p>
          O GastandoYa está comprometido em cumprir a Lei Geral de Proteção de Dados 
          (LGPD - Lei nº 13.709/2018). Você tem direitos garantidos pela LGPD, incluindo 
          confirmação da existência de tratamento, acesso, correção, anonimização, bloqueio, 
          eliminação, portabilidade e revogação do consentimento.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          8. Contato
        </h2>
        <p>Se você tiver dúvidas sobre esta Política de Privacidade:</p>
        <p style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          fontFamily: 'monospace'
        }}>
          <strong>E-mail:</strong> contato@gastandoya.com
        </p>
      </section>

      <section style={{ 
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '2px solid #e5e7eb',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <p><strong>GastandoYa</strong> - Controle suas despesas de forma inteligente</p>
        <p>Versão 1.0 | Dezembro 2025</p>
      </section>
    </div>
  )
}



