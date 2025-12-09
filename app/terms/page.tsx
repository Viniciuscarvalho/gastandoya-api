export default function TermsPage() {
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
        Termos de Uso - GastandoYa
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        <strong>Última atualização:</strong> Dezembro de 2025
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          1. Aceitação dos Termos
        </h2>
        <p>
          Bem-vindo ao GastandoYa. Estes Termos de Uso regem seu acesso e uso do aplicativo móvel 
          GastandoYa e seus serviços relacionados, incluindo a integração com o Notion.
        </p>
        <p style={{ 
          backgroundColor: '#fef3c7', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          border: '1px solid #fbbf24'
        }}>
          <strong>Ao usar o GastandoYa, você concorda em cumprir estes Termos.</strong> Se você não 
          concordar com estes Termos, não use o GastandoYa.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          2. Descrição do Serviço
        </h2>
        <p>O GastandoYa é um aplicativo móvel de gerenciamento financeiro que oferece:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Registro e acompanhamento de despesas pessoais</li>
          <li>Integração opcional com o Notion via OAuth 2.0</li>
          <li>Sincronização de dados de despesas de databases do Notion</li>
          <li>Armazenamento local de dados no dispositivo do usuário</li>
        </ul>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          2.1 Integração com Notion
        </h3>
        <p>A integração com o Notion é <strong>opcional</strong> e permite:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Leitura de despesas de um database específico do seu workspace Notion</li>
          <li>Sincronização sob demanda (não automática)</li>
          <li>Visualização de dados do Notion dentro do aplicativo móvel</li>
        </ul>
        <p style={{ 
          backgroundColor: '#dcfce7', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          border: '1px solid #86efac'
        }}>
          <strong>Importante:</strong> O GastandoYa é somente leitura ("read-only"). 
          Não criamos, editamos ou deletamos dados no seu Notion.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          3. Requisitos de Conta
        </h2>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          3.1 Elegibilidade
        </h3>
        <p>Você deve ter pelo menos <strong>18 anos</strong> para usar o GastandoYa.</p>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          3.2 Conta Notion
        </h3>
        <p>Para usar a integração com Notion, você deve:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Possuir uma conta válida no Notion</li>
          <li>Ter permissão para compartilhar os databases que conectar ao GastandoYa</li>
          <li>Cumprir os Termos de Serviço do Notion</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          4. Uso Permitido
        </h2>
        <p>Você concorda em usar o GastandoYa apenas para fins legais. Você <strong>NÃO</strong> pode:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Usar o serviço de forma que viole leis ou regulamentos</li>
          <li>Tentar acessar dados de outros usuários</li>
          <li>Fazer engenharia reversa, descompilar ou desmontar o aplicativo</li>
          <li>Usar o serviço para transmitir vírus, malware ou código malicioso</li>
          <li>Sobrecarregar nossos servidores com requisições excessivas</li>
          <li>Revender ou redistribuir o serviço sem autorização</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          5. Integração com Notion
        </h2>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          5.1 Autorização OAuth
        </h3>
        <p>Ao conectar sua conta Notion:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Você será redirecionado para o site oficial do Notion</li>
          <li>Deverá autorizar explicitamente o acesso do GastandoYa</li>
          <li>Pode revogar o acesso a qualquer momento</li>
        </ul>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#374151' }}>
          5.2 Escopo de Acesso
        </h3>
        <p>O GastandoYa solicita apenas permissões de <strong>leitura</strong> para:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Acessar databases específicos que você compartilhar</li>
          <li>Ler propriedades de páginas dentro desses databases</li>
        </ul>
        <p>Não solicitamos acesso a:</p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Informações pessoais além do workspace ID</li>
          <li>Databases ou páginas não compartilhadas explicitamente</li>
          <li>Permissões de escrita ou edição</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          6. Privacidade e Segurança
        </h2>
        <p>
          O uso de suas informações pessoais é regido pela nossa{' '}
          <a href="/privacy" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
            Política de Privacidade
          </a>
          , que faz parte integrante destes Termos.
        </p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Tokens OAuth são armazenados de forma criptografada</li>
          <li>Nunca compartilhamos seus tokens com terceiros</li>
          <li>Você pode revogar tokens a qualquer momento</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          7. Limitação de Responsabilidade
        </h2>
        <p style={{ 
          backgroundColor: '#fee2e2', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          border: '1px solid #fca5a5'
        }}>
          O GastandoYa é fornecido <strong>"como está"</strong> e <strong>"conforme disponível"</strong>. 
          Não garantimos que o serviço estará sempre disponível ou livre de erros.
        </p>
        <p>
          Nossa responsabilidade total não excederá o valor pago por você (se houver) nos últimos 12 meses.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          8. Lei Aplicável e Jurisdição
        </h2>
        <p>
          Estes Termos são regidos pelas leis da <strong>República Federativa do Brasil</strong>.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          9. Conformidade com LGPD
        </h2>
        <p>
          O GastandoYa está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). 
          Consulte nossa Política de Privacidade para detalhes.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>
          10. Contato
        </h2>
        <p>Se você tiver dúvidas sobre estes Termos de Uso:</p>
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
        textAlign: 'center'
      }}>
        <p style={{ 
          backgroundColor: '#dbeafe', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <strong>AO USAR O GASTANDOYA, VOCÊ RECONHECE QUE LEU, COMPREENDEU E CONCORDA 
          EM ESTAR VINCULADO A ESTES TERMOS DE USO E À NOSSA POLÍTICA DE PRIVACIDADE.</strong>
        </p>
        
        <div style={{ marginTop: '2rem', color: '#6b7280' }}>
          <p><strong>GastandoYa</strong> - Controle suas despesas de forma inteligente</p>
          <p>Desenvolvido no Brasil 🇧🇷</p>
          <p>Versão 1.0 | Dezembro 2025</p>
          <p>© 2025 GastandoYa. Todos os direitos reservados.</p>
        </div>
      </section>
    </div>
  )
}

