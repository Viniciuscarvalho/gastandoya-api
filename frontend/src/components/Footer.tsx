export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-sm text-black">
              G
            </div>
            <span className="text-lg font-bold">
              Gastando<span className="gradient-text">Ya</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="#funcionalidades" className="hover:text-white transition-colors">
              Funcionalidades
            </a>
            <a href="#premium" className="hover:text-white transition-colors">
              Premium
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#contato" className="hover:text-white transition-colors">
              Contato
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-neutral-500">
            © {currentYear} GastandoYa. Todos os direitos reservados.
          </p>
        </div>

        {/* Links legais */}
        <div className="mt-8 pt-8 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
          <a
            href="https://api.gastandoya.com.br/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Política de Privacidade
          </a>
          <a
            href="https://api.gastandoya.com.br/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  )
}

