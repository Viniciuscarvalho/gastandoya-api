export default function NotionSuccessPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || 'N/A'
  const maskedUserId = userId !== 'N/A' 
    ? `${userId.substring(0, 8)}...${userId.substring(userId.length - 4)}`
    : 'N/A'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f9fafb',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
        }}>
          ✓
        </div>
        
        <h1 style={{ 
          color: '#00875A', 
          fontSize: '2rem', 
          marginBottom: '1rem',
          fontWeight: '600',
        }}>
          Notion Conectado com Sucesso!
        </h1>
        
        <p style={{ 
          color: '#6B7280', 
          fontSize: '1.125rem', 
          marginBottom: '1.5rem',
          lineHeight: '1.6',
        }}>
          Sua conta Notion foi conectada ao GastandoYa. Agora você pode sincronizar suas despesas!
        </p>

        {userId !== 'N/A' && (
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6B7280',
              margin: 0,
            }}>
              <strong>Device ID:</strong> {maskedUserId}
            </p>
          </div>
        )}

        <div style={{
          backgroundColor: '#dbeafe',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#1e40af',
            margin: 0,
            lineHeight: '1.5',
          }}>
            💡 <strong>Próximo passo:</strong> Configure qual database do Notion deseja usar para suas despesas no app.
          </p>
        </div>
        
        <p style={{ 
          color: '#9CA3AF',
          fontSize: '0.875rem',
        }}>
          Você pode fechar esta janela e voltar ao app GastandoYa.
        </p>

        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb',
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#9CA3AF',
            margin: 0,
          }}>
            Esta conexão é segura e você pode revogá-la a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  )
}



