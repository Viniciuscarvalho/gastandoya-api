'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function NotionRedirectContent() {
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(3)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Construir deep link baseado nos parâmetros
    let deepLinkUrl: string

    const success = searchParams.get('success')
    const errorParam = searchParams.get('error')
    const userId = searchParams.get('userId')

    if (success === 'true' && userId) {
      // Sucesso
      deepLinkUrl = `gastandoya://notion/callback?success=true&userId=${encodeURIComponent(userId)}`
    } else if (errorParam) {
      // Erro
      deepLinkUrl = `gastandoya://notion/callback?error=${encodeURIComponent(errorParam)}`
    } else {
      // Parâmetros inválidos
      setError('Parâmetros inválidos na URL')
      return
    }

    console.log('🔗 Attempting to open deep link:', deepLinkUrl)

    // Tentar abrir o deep link imediatamente
    window.location.href = deepLinkUrl

    // Countdown para fallback
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [searchParams])

  const handleManualOpen = () => {
    const success = searchParams.get('success')
    const errorParam = searchParams.get('error')
    const userId = searchParams.get('userId')

    let deepLinkUrl: string

    if (success === 'true' && userId) {
      deepLinkUrl = `gastandoya://notion/callback?success=true&userId=${encodeURIComponent(userId)}`
    } else if (errorParam) {
      deepLinkUrl = `gastandoya://notion/callback?error=${encodeURIComponent(errorParam)}`
    } else {
      return
    }

    window.location.href = deepLinkUrl
  }

  if (error) {
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
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          textAlign: 'center',
        }}>
          <h1 style={{ color: '#DC2626', fontSize: '1.5rem', marginBottom: '1rem' }}>
            ❌ Erro
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1rem' }}>
            {error}
          </p>
        </div>
      </div>
    )
  }

  const isSuccess = searchParams.get('success') === 'true'

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
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
        }}>
          {isSuccess ? '✅' : '⚠️'}
        </div>
        
        <h1 style={{
          color: isSuccess ? '#00875A' : '#DC2626',
          fontSize: '1.5rem',
          marginBottom: '1rem',
        }}>
          {isSuccess ? 'Notion Conectado!' : 'Erro na Conexão'}
        </h1>
        
        <p style={{
          color: '#6B7280',
          fontSize: '1rem',
          marginBottom: '2rem',
        }}>
          {isSuccess 
            ? 'Redirecionando para o app...'
            : 'Ocorreu um erro na conexão.'
          }
        </p>

        {countdown > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '2rem',
            color: '#6B7280',
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #E5E7EB',
              borderTopColor: '#3B82F6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            <span>Abrindo app em {countdown}s...</span>
          </div>
        )}

        {countdown === 0 && (
          <div>
            <button
              onClick={handleManualOpen}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '1rem',
              }}
            >
              Abrir GastandoYa
            </button>
            
            <p style={{
              color: '#9CA3AF',
              fontSize: '0.875rem',
            }}>
              O app não abriu automaticamente? Toque no botão acima.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default function NotionRedirectPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#6B7280',
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #E5E7EB',
            borderTopColor: '#3B82F6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <span>Carregando...</span>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    }>
      <NotionRedirectContent />
    </Suspense>
  )
}


