import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold font-heading gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-200 mb-3">
          Página não encontrada
        </h2>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 btn-primary px-8 py-3 rounded-full text-sm font-semibold"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar ao Início
        </Link>
      </div>
    </div>
  )
}
