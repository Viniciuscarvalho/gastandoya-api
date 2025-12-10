export default function HomePage() {
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
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem',
        color: '#111827',
      }}>
        GastandoYa API
      </h1>
      <p style={{ 
        color: '#6b7280', 
        fontSize: '1.125rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: '600px',
      }}>
        Backend API para integração do app iOS GastandoYa com Notion
      </p>
      
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
      }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#111827' }}>
          Endpoints Disponíveis
        </h2>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          color: '#4b5563',
        }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <code style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}>
              GET /api/notion/oauth/authorize
            </code>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <code style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}>
              GET /api/notion/oauth/callback
            </code>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <code style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}>
              GET /api/notion/expenses
            </code>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <code style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}>
              POST /api/notion/config/database
            </code>
          </li>
        </ul>
      </div>

      <div style={{ 
        marginTop: '2rem',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '0.875rem',
      }}>
        <p>
          📖 <a 
            href="https://github.com/viniciuscarvalho/gastandoya-api" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3b82f6', textDecoration: 'none' }}
          >
            Documentação
          </a>
        </p>
      </div>
    </div>
  )
}








