export default function NotionErrorPage({
  searchParams,
}: {
  searchParams: { reason?: string }
}) {
  const errorMessages: Record<string, string> = {
    authorization_denied: 'Você negou a autorização. Para usar a integração com Notion, é necessário conceder acesso.',
    invalid_state: 'Estado de autorização inválido ou expirado. Tente novamente.',
    default: 'Ocorreu um erro ao conectar com o Notion. Tente novamente.',
  }

  const message = searchParams.reason 
    ? errorMessages[searchParams.reason] || errorMessages.default
    : errorMessages.default

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h1 style={{ color: '#DC2626', fontSize: '2rem', marginBottom: '1rem' }}>
        ✗ Erro na Conexão
      </h1>
      <p style={{ color: '#6B7280', fontSize: '1.125rem', textAlign: 'center', maxWidth: '500px' }}>
        {message}
      </p>
      <p style={{ marginTop: '2rem', color: '#9CA3AF' }}>
        Você pode fechar esta janela e tentar novamente no app.
      </p>
    </div>
  )
}

