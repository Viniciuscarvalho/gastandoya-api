export default function NotionSuccessPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
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
      <h1 style={{ color: '#00875A', fontSize: '2rem', marginBottom: '1rem' }}>
        ✓ Notion Conectado com Sucesso!
      </h1>
      <p style={{ color: '#6B7280', fontSize: '1.125rem', textAlign: 'center', maxWidth: '500px' }}>
        Sua conta Notion foi conectada ao GastandoYa. 
        {searchParams.userId && ` (Usuário: ${searchParams.userId})`}
      </p>
      <p style={{ marginTop: '2rem', color: '#9CA3AF' }}>
        Você pode fechar esta janela e voltar ao app.
      </p>
    </div>
  )
}


