import type { Locale } from '@/i18n'
import { APP_STORE_URL } from './constants'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string
  readingTime: string
  tags: string[]
  content: string
}

const blogPostsPtBR: BlogPost[] = [
  {
    slug: 'como-controlar-gastos-mensais-no-iphone',
    title: 'Como Controlar Gastos Mensais no iPhone',
    excerpt: 'Aprenda a organizar suas finanças pessoais usando o iPhone com o GastandoYa. Dicas práticas para controlar gastos mensais, criar orçamentos e alcançar suas metas financeiras.',
    coverImage: '/screens/screen-1.png',
    publishedAt: '2025-02-18',
    readingTime: '8 min',
    tags: ['Controle Financeiro', 'iPhone', 'Dicas'],
    content: `
<p>Controlar gastos mensais é o primeiro passo para uma vida financeira saudável. Se você tem um iPhone, já possui a ferramenta perfeita no bolso para transformar a forma como lida com seu dinheiro. Neste artigo, vamos mostrar como o <strong>GastandoYa</strong> pode ser seu aliado nessa jornada.</p>

<h2>Por que controlar seus gastos mensais?</h2>

<p>Segundo pesquisas recentes, mais de 60% dos brasileiros não sabem exatamente para onde vai seu dinheiro no final do mês. Essa falta de controle financeiro leva a dívidas, estresse e impossibilidade de planejar o futuro.</p>

<p>Com um <strong>app de controle de gastos no iPhone</strong>, você registra cada transação no momento em que ela acontece, evitando esquecimentos e garantindo uma visão real das suas finanças.</p>

<h2>Registrando lançamentos rapidamente</h2>

<img src="/screens/screen-5.png" alt="Tela de lançamentos do GastandoYa mostrando entradas e saídas do mês" />

<p>O GastandoYa foi projetado para ser <strong>rápido e intuitivo</strong>. Registrar um gasto leva menos de 5 segundos:</p>

<ol>
<li>Abra o app e toque no botão de adicionar</li>
<li>Insira o valor e selecione a categoria</li>
<li>Pronto! O lançamento aparece instantaneamente no seu painel</li>
</ol>

<p>Você pode categorizar gastos como alimentação, transporte, lazer, saúde, educação e muito mais. Cada categoria tem seu próprio ícone e cor, facilitando a visualização.</p>

<h2>Analisando suas estatísticas</h2>

<img src="/screens/screen-1.png" alt="Painel de estatísticas do GastandoYa com gráficos de gastos por categoria" />

<p>O painel de estatísticas mostra exatamente para onde seu dinheiro está indo. Você visualiza:</p>

<ul>
<li><strong>Saldo do mês:</strong> entradas menos saídas em tempo real</li>
<li><strong>Gastos por categoria:</strong> gráficos visuais que revelam seus maiores gastos</li>
<li><strong>Tendências:</strong> compare meses anteriores para identificar padrões</li>
<li><strong>Parcelas:</strong> acompanhe compras parceladas sem surpresas</li>
</ul>

<h2>Criando metas financeiras</h2>

<p>Além de controlar gastos, é essencial ter objetivos. No GastandoYa, você cria <strong>metas financeiras</strong> com valor alvo e data limite. Quer juntar para uma viagem? Dar entrada em um carro? Criar sua reserva de emergência?</p>

<p>O app mostra seu progresso de forma visual e motivadora, ajudando você a manter o foco nos seus objetivos.</p>

<h2>Sincronização segura via iCloud</h2>

<p>Todos os seus dados ficam protegidos e sincronizados entre seus dispositivos Apple via <strong>iCloud</strong>. Isso significa que você pode registrar um gasto no iPhone e ver a atualização no iPad instantaneamente, tudo criptografado e sem passar por servidores externos.</p>

<h2>Comece agora</h2>

<p>O controle financeiro é um hábito que se constrói dia a dia. Com o GastandoYa no seu iPhone, você tem uma ferramenta poderosa, bonita e respeitosa com sua <strong>privacidade</strong>. Baixe gratuitamente na App Store e comece hoje mesmo a transformar sua relação com o dinheiro.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Baixar GastandoYa na App Store</a>
`,
  },
  {
    slug: 'melhor-app-financas-usuarios-apple',
    title: 'Melhor App de Finanças para Usuários Apple',
    excerpt: 'Descubra por que o GastandoYa é o melhor app de finanças pessoais para quem usa iPhone e iPad. Nativo iOS, integração iCloud, Notion e total privacidade.',
    coverImage: '/screens/screen-2.png',
    publishedAt: '2025-02-20',
    readingTime: '7 min',
    tags: ['iOS', 'Apple', 'Comparativo'],
    content: `
<p>Se você faz parte do ecossistema Apple, sabe que a experiência do usuário faz toda a diferença. Muitos apps de finanças são adaptações de Android que não aproveitam o melhor do iOS. O <strong>GastandoYa</strong> foi construído do zero para iPhone e iPad, oferecendo uma experiência verdadeiramente nativa.</p>

<h2>Por que escolher um app nativo iOS?</h2>

<p>Apps nativos aproveitam recursos exclusivos do sistema operacional da Apple:</p>

<ul>
<li><strong>Performance superior:</strong> animações fluidas a 60fps sem travamentos</li>
<li><strong>Integração com iCloud:</strong> sincronização automática e segura entre dispositivos</li>
<li><strong>Design consistente:</strong> segue as Human Interface Guidelines da Apple</li>
<li><strong>Privacidade:</strong> usa frameworks nativos de segurança do iOS</li>
<li><strong>Widgets:</strong> acesse informações rápidas diretamente da tela inicial</li>
</ul>

<h2>Visão completa das suas finanças</h2>

<img src="/screens/screen-2.png" alt="Resumo financeiro completo do GastandoYa com saldo, fluxo de caixa e insights" />

<p>O GastandoYa oferece um <strong>resumo financeiro completo</strong> que inclui saldo atual, fluxo de caixa mensal e insights inteligentes. Você pode alternar entre visualizações por semana, mês, ano ou ver tudo de uma vez.</p>

<h2>Metas financeiras visuais</h2>

<img src="/screens/screen-3.png" alt="Tela de metas financeiras do GastandoYa com progresso visual" />

<p>Defina objetivos financeiros e acompanhe o progresso de forma visual. Cada meta mostra:</p>

<ul>
<li>Valor atual vs. valor alvo</li>
<li>Porcentagem de conclusão com barra de progresso</li>
<li>Data limite e projeção de alcance</li>
<li>Histórico de contribuições</li>
</ul>

<h2>Integração com Notion</h2>

<p>Para quem já organiza a vida no Notion, o GastandoYa oferece integração direta. Importe transações de databases do Notion, mantendo tudo centralizado. É a única app de finanças iOS com essa integração.</p>

<h2>Importação de CSV e PDF</h2>

<p>Recebeu o extrato do banco em PDF ou tem uma planilha com seus gastos? O GastandoYa importa arquivos <strong>CSV e PDF</strong> automaticamente, mapeando colunas para nome, data, valor e categoria.</p>

<h2>Privacidade como prioridade</h2>

<p>Diferente de muitos apps de finanças que vendem seus dados ou exigem login com email, o GastandoYa armazena tudo <strong>localmente no dispositivo</strong>. A sincronização é feita exclusivamente via iCloud, criptografada de ponta a ponta. Seus dados financeiros nunca passam por servidores de terceiros.</p>

<h2>Experimente gratuitamente</h2>

<p>O GastandoYa oferece funcionalidades básicas gratuitamente, com a opção de desbloquear recursos Premium como relatórios em PDF, regras inteligentes e multi-moeda. Baixe agora e descubra por que é o <strong>melhor app de finanças para usuários Apple</strong>.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Baixar GastandoYa na App Store</a>
`,
  },
  {
    slug: 'como-integrar-notion-controle-financeiro',
    title: 'Como Integrar Notion com Controle Financeiro',
    excerpt: 'Guia completo de como usar a integração do Notion com o GastandoYa para importar transações financeiras e centralizar o controle de gastos.',
    coverImage: '/screens/screen-6.png',
    publishedAt: '2025-02-22',
    readingTime: '9 min',
    tags: ['Notion', 'Integração', 'Tutorial'],
    content: `
<p>O Notion se tornou uma das ferramentas mais populares para organização pessoal e profissional. Muitas pessoas já usam databases do Notion para rastrear gastos e receitas. Com o <strong>GastandoYa</strong>, você pode importar essas informações diretamente para um app de finanças dedicado, com gráficos, metas e análises que o Notion sozinho não oferece.</p>

<h2>Por que integrar Notion com um app de finanças?</h2>

<p>O Notion é excelente para organização, mas tem limitações como app financeiro:</p>

<ul>
<li>Não possui gráficos de gastos por categoria nativos</li>
<li>Não calcula saldo automaticamente com regras financeiras</li>
<li>Não oferece metas financeiras com progresso visual</li>
<li>Não tem sincronização otimizada para dispositivos móveis</li>
</ul>

<p>Com a integração GastandoYa + Notion, você mantém o Notion como sua central de organização e ganha um app dedicado para <strong>análise e controle financeiro</strong>.</p>

<h2>Como configurar a integração</h2>

<img src="/screens/screen-6.png" alt="Tela de integração com Notion do GastandoYa mostrando conexão OAuth" />

<p>O processo é simples e seguro:</p>

<ol>
<li><strong>Abra o GastandoYa</strong> e vá em Configurações → Integrações</li>
<li><strong>Toque em "Conectar Notion"</strong> — você será redirecionado para a página de autorização do Notion</li>
<li><strong>Selecione o workspace e databases</strong> que deseja compartilhar</li>
<li><strong>Autorize o acesso</strong> — a conexão usa OAuth 2.0, o padrão de segurança da indústria</li>
<li><strong>Pronto!</strong> Suas transações começarão a ser importadas</li>
</ol>

<h2>Mapeamento de campos</h2>

<p>O GastandoYa identifica automaticamente os campos do seu database no Notion:</p>

<ul>
<li><strong>Nome/Descrição:</strong> título da transação</li>
<li><strong>Data:</strong> quando a transação ocorreu</li>
<li><strong>Valor:</strong> montante em reais (ou outra moeda)</li>
<li><strong>Categoria:</strong> classificação do gasto</li>
<li><strong>Tipo:</strong> se é entrada ou saída</li>
</ul>

<p>Se os nomes das colunas forem diferentes, você pode fazer o mapeamento manual na tela de configuração.</p>

<h2>Importação de dados existentes</h2>

<img src="/screens/screen-7.png" alt="Tela de importação do GastandoYa com mapeamento de colunas CSV e PDF" />

<p>Além do Notion, o GastandoYa importa dados de <strong>arquivos CSV e PDF</strong>. Isso é útil se você tem extratos bancários ou planilhas com histórico financeiro. O app detecta automaticamente o formato das colunas e permite ajustes antes da importação.</p>

<h2>Dicas para organizar finanças no Notion</h2>

<p>Para aproveitar melhor a integração, organize seu database no Notion com estas propriedades:</p>

<ul>
<li>Uma coluna de <strong>título</strong> para o nome da transação</li>
<li>Uma propriedade de <strong>data</strong> para quando ocorreu</li>
<li>Uma propriedade de <strong>número</strong> para o valor</li>
<li>Um <strong>select</strong> para a categoria (Alimentação, Transporte, Lazer, etc.)</li>
<li>Um <strong>select</strong> para tipo (Entrada ou Saída)</li>
</ul>

<h2>Segurança da integração</h2>

<p>A conexão entre GastandoYa e Notion usa <strong>OAuth 2.0</strong>, o mesmo protocolo usado por Google, Apple e Microsoft. Isso significa que:</p>

<ul>
<li>Suas credenciais do Notion nunca são compartilhadas com o app</li>
<li>Você controla exatamente quais databases são acessíveis</li>
<li>Você pode revogar o acesso a qualquer momento</li>
<li>Os dados importados ficam armazenados localmente no seu iPhone</li>
</ul>

<h2>Comece a integração</h2>

<p>Se você já usa o Notion para rastrear gastos, a integração com o GastandoYa é o próximo passo natural. Ganhe gráficos, metas e insights que transformam dados brutos em <strong>controle financeiro real</strong>.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Baixar GastandoYa na App Store</a>
`,
  },
  {
    slug: 'app-financas-nao-coleta-dados',
    title: 'App de Finanças que Não Coleta seus Dados',
    excerpt: 'Entenda como o GastandoYa protege sua privacidade financeira. Armazenamento local, iCloud criptografado e zero coleta de dados pessoais.',
    coverImage: '/screens/screen-4.png',
    publishedAt: '2025-02-24',
    readingTime: '7 min',
    tags: ['Privacidade', 'Segurança', 'iCloud'],
    content: `
<p>Seus dados financeiros são algumas das informações mais sensíveis que existem. Eles revelam onde você mora, o que consome, quanto ganha e como gasta. Mesmo assim, a maioria dos apps de finanças coleta e armazena essas informações em servidores próprios. O <strong>GastandoYa</strong> foi construído com uma filosofia diferente: seus dados são seus, e ponto final.</p>

<h2>O problema da coleta de dados em apps de finanças</h2>

<p>Muitos apps populares de controle financeiro:</p>

<ul>
<li>Exigem cadastro com email e senha</li>
<li>Armazenam transações em servidores da empresa</li>
<li>Compartilham dados agregados com terceiros</li>
<li>Usam seus padrões de consumo para direcionar anúncios</li>
<li>Podem sofrer vazamentos de dados que expõem informações sensíveis</li>
</ul>

<p>Mesmo com políticas de privacidade, o simples fato de seus dados existirem em um servidor externo já representa um risco. Vazamentos acontecem, empresas são vendidas, e políticas mudam.</p>

<h2>Como o GastandoYa protege sua privacidade</h2>

<img src="/screens/screen-4.png" alt="Tela de sincronização segura via iCloud do GastandoYa" />

<p>O GastandoYa adota uma abordagem radical de privacidade:</p>

<ul>
<li><strong>Armazenamento local:</strong> todos os dados ficam no seu iPhone, usando o armazenamento seguro do iOS</li>
<li><strong>Sem cadastro:</strong> não pedimos email, nome, telefone ou qualquer dado pessoal</li>
<li><strong>Sem servidores próprios:</strong> não temos banco de dados com informações de usuários</li>
<li><strong>Sem analytics invasivos:</strong> não rastreamos como você usa o app</li>
<li><strong>Sem anúncios:</strong> seu perfil de consumo não é vendido</li>
</ul>

<h2>Sincronização via iCloud</h2>

<p>Para quem deseja usar o app em múltiplos dispositivos, a sincronização é feita exclusivamente via <strong>iCloud</strong>, a infraestrutura de nuvem da Apple:</p>

<ul>
<li>Criptografia de ponta a ponta: nem a Apple consegue ler seus dados</li>
<li>Sincronização automática entre iPhone e iPad</li>
<li>Backup automático que protege contra perda do dispositivo</li>
<li>Você controla o que é sincronizado nas configurações do iOS</li>
</ul>

<img src="/screens/screen-1.png" alt="Painel de estatísticas do GastandoYa com visão geral de gastos" />

<h2>Comparação de privacidade</h2>

<p>Veja como o GastandoYa se compara com outros apps populares:</p>

<ul>
<li><strong>GastandoYa:</strong> dados locais + iCloud, sem cadastro, sem servidores próprios</li>
<li><strong>Apps tradicionais:</strong> dados em servidores da empresa, cadastro obrigatório, analytics extensivos</li>
<li><strong>Apps de banco:</strong> acesso completo às suas transações bancárias, compartilhamento com parceiros</li>
</ul>

<h2>Open Banking vs. Controle Manual</h2>

<p>Alguns apps oferecem integração com Open Banking para importar transações automaticamente. Embora conveniente, isso exige compartilhar acesso à sua conta bancária com terceiros. O GastandoYa escolheu o caminho do <strong>registro manual e importação de arquivos</strong> (CSV/PDF), priorizando privacidade sobre conveniência.</p>

<p>Para quem já organiza gastos no Notion, a integração usa OAuth 2.0, que não expõe suas credenciais e permite revogação a qualquer momento.</p>

<h2>Transparência total</h2>

<p>O GastandoYa é transparente sobre o que faz e o que não faz com seus dados:</p>

<ul>
<li>Nossa política de privacidade é clara e objetiva</li>
<li>Listamos explicitamente que não coletamos dados pessoais</li>
<li>O app funciona 100% offline após instalação</li>
<li>Atualizações nunca adicionam coleta de dados</li>
</ul>

<h2>Proteja suas finanças</h2>

<p>Se privacidade é importante para você, escolha um app de finanças que respeite isso de verdade. O GastandoYa prova que é possível ter um <strong>controle financeiro completo</strong> sem abrir mão da sua privacidade.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Baixar GastandoYa na App Store</a>
`,
  },
]

const blogPostsEnUS: BlogPost[] = [
  {
    slug: 'como-controlar-gastos-mensais-no-iphone',
    title: 'How to Track Monthly Expenses on iPhone',
    excerpt: 'Learn how to organize your personal finances using your iPhone with GastandoYa. Practical tips for tracking monthly expenses, creating budgets, and reaching your financial goals.',
    coverImage: '/screens/screen-1.png',
    publishedAt: '2025-02-18',
    readingTime: '8 min',
    tags: ['Financial Tracking', 'iPhone', 'Tips'],
    content: `
<p>Tracking monthly expenses is the first step toward a healthy financial life. If you have an iPhone, you already have the perfect tool in your pocket to transform the way you handle your money. In this article, we will show you how <strong>GastandoYa</strong> can be your ally on this journey.</p>

<h2>Why should you track your monthly expenses?</h2>

<p>According to recent studies, more than 60% of people do not know exactly where their money goes by the end of the month. This lack of financial control leads to debt, stress, and the inability to plan for the future.</p>

<p>With an <strong>expense tracking app on iPhone</strong>, you record each transaction at the moment it happens, avoiding forgetfulness and ensuring a real picture of your finances.</p>

<h2>Recording transactions quickly</h2>

<img src="/screens/screen-5.png" alt="GastandoYa transactions screen showing income and expenses for the month" />

<p>GastandoYa was designed to be <strong>fast and intuitive</strong>. Recording an expense takes less than 5 seconds:</p>

<ol>
<li>Open the app and tap the add button</li>
<li>Enter the amount and select the category</li>
<li>Done! The transaction instantly appears on your dashboard</li>
</ol>

<p>You can categorize expenses such as food, transportation, entertainment, health, education, and much more. Each category has its own icon and color, making it easy to visualize.</p>

<h2>Analyzing your statistics</h2>

<img src="/screens/screen-1.png" alt="GastandoYa statistics dashboard with expense charts by category" />

<p>The statistics dashboard shows you exactly where your money is going. You can view:</p>

<ul>
<li><strong>Monthly balance:</strong> income minus expenses in real time</li>
<li><strong>Expenses by category:</strong> visual charts that reveal your biggest expenses</li>
<li><strong>Trends:</strong> compare previous months to identify patterns</li>
<li><strong>Installments:</strong> track installment purchases without surprises</li>
</ul>

<h2>Creating financial goals</h2>

<p>Beyond tracking expenses, it is essential to have objectives. In GastandoYa, you create <strong>financial goals</strong> with a target amount and a deadline. Want to save for a trip? Make a down payment on a car? Build your emergency fund?</p>

<p>The app shows your progress in a visual and motivating way, helping you stay focused on your objectives.</p>

<h2>Secure iCloud sync</h2>

<p>All your data is protected and synced across your Apple devices via <strong>iCloud</strong>. This means you can record an expense on your iPhone and see the update on your iPad instantly, all encrypted and without passing through external servers.</p>

<h2>Get started now</h2>

<p>Financial control is a habit built day by day. With GastandoYa on your iPhone, you have a powerful, beautiful tool that respects your <strong>privacy</strong>. Download it for free on the App Store and start transforming your relationship with money today.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Download GastandoYa on App Store</a>
`,
  },
  {
    slug: 'melhor-app-financas-usuarios-apple',
    title: 'Best Finance App for Apple Users',
    excerpt: 'Discover why GastandoYa is the best personal finance app for iPhone and iPad users. Native iOS, iCloud integration, Notion support, and total privacy.',
    coverImage: '/screens/screen-2.png',
    publishedAt: '2025-02-20',
    readingTime: '7 min',
    tags: ['iOS', 'Apple', 'Comparison'],
    content: `
<p>If you are part of the Apple ecosystem, you know that user experience makes all the difference. Many finance apps are Android adaptations that do not take advantage of the best of iOS. <strong>GastandoYa</strong> was built from scratch for iPhone and iPad, offering a truly native experience.</p>

<h2>Why choose a native iOS app?</h2>

<p>Native apps take advantage of exclusive features of Apple's operating system:</p>

<ul>
<li><strong>Superior performance:</strong> smooth 60fps animations without lag</li>
<li><strong>iCloud integration:</strong> automatic and secure sync across devices</li>
<li><strong>Consistent design:</strong> follows Apple's Human Interface Guidelines</li>
<li><strong>Privacy:</strong> uses native iOS security frameworks</li>
<li><strong>Widgets:</strong> access quick information directly from the home screen</li>
</ul>

<h2>Complete view of your finances</h2>

<img src="/screens/screen-2.png" alt="GastandoYa complete financial summary with balance, cash flow, and insights" />

<p>GastandoYa offers a <strong>complete financial summary</strong> that includes current balance, monthly cash flow, and smart insights. You can switch between weekly, monthly, yearly views, or see everything at once.</p>

<h2>Visual financial goals</h2>

<img src="/screens/screen-3.png" alt="GastandoYa financial goals screen with visual progress" />

<p>Set financial objectives and track progress visually. Each goal shows:</p>

<ul>
<li>Current amount vs. target amount</li>
<li>Completion percentage with progress bar</li>
<li>Deadline and projected achievement date</li>
<li>Contribution history</li>
</ul>

<h2>Notion integration</h2>

<p>For those who already organize their lives in Notion, GastandoYa offers direct integration. Import transactions from Notion databases, keeping everything centralized. It is the only iOS finance app with this integration.</p>

<h2>CSV and PDF import</h2>

<p>Received your bank statement as a PDF or have a spreadsheet with your expenses? GastandoYa imports <strong>CSV and PDF</strong> files automatically, mapping columns to name, date, amount, and category.</p>

<h2>Privacy as a priority</h2>

<p>Unlike many finance apps that sell your data or require email login, GastandoYa stores everything <strong>locally on your device</strong>. Sync is done exclusively via iCloud, with end-to-end encryption. Your financial data never passes through third-party servers.</p>

<h2>Try it for free</h2>

<p>GastandoYa offers basic features for free, with the option to unlock Premium features such as PDF reports, smart rules, and multi-currency support. Download now and discover why it is the <strong>best finance app for Apple users</strong>.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Download GastandoYa on App Store</a>
`,
  },
  {
    slug: 'como-integrar-notion-controle-financeiro',
    title: 'How to Integrate Notion with Financial Tracking',
    excerpt: 'Complete guide on how to use the Notion integration with GastandoYa to import financial transactions and centralize expense tracking.',
    coverImage: '/screens/screen-6.png',
    publishedAt: '2025-02-22',
    readingTime: '9 min',
    tags: ['Notion', 'Integration', 'Tutorial'],
    content: `
<p>Notion has become one of the most popular tools for personal and professional organization. Many people already use Notion databases to track expenses and income. With <strong>GastandoYa</strong>, you can import this information directly into a dedicated finance app, with charts, goals, and analyses that Notion alone does not offer.</p>

<h2>Why integrate Notion with a finance app?</h2>

<p>Notion is excellent for organization, but it has limitations as a financial app:</p>

<ul>
<li>It does not have native expense-by-category charts</li>
<li>It does not automatically calculate balances with financial rules</li>
<li>It does not offer financial goals with visual progress</li>
<li>It does not have sync optimized for mobile devices</li>
</ul>

<p>With the GastandoYa + Notion integration, you keep Notion as your organization hub and gain a dedicated app for <strong>financial analysis and tracking</strong>.</p>

<h2>How to set up the integration</h2>

<img src="/screens/screen-6.png" alt="GastandoYa Notion integration screen showing OAuth connection" />

<p>The process is simple and secure:</p>

<ol>
<li><strong>Open GastandoYa</strong> and go to Settings → Integrations</li>
<li><strong>Tap "Connect Notion"</strong> — you will be redirected to the Notion authorization page</li>
<li><strong>Select the workspace and databases</strong> you want to share</li>
<li><strong>Authorize access</strong> — the connection uses OAuth 2.0, the industry security standard</li>
<li><strong>Done!</strong> Your transactions will start being imported</li>
</ol>

<h2>Field mapping</h2>

<p>GastandoYa automatically identifies the fields in your Notion database:</p>

<ul>
<li><strong>Name/Description:</strong> transaction title</li>
<li><strong>Date:</strong> when the transaction occurred</li>
<li><strong>Amount:</strong> value in your currency</li>
<li><strong>Category:</strong> expense classification</li>
<li><strong>Type:</strong> whether it is income or expense</li>
</ul>

<p>If the column names are different, you can do the mapping manually in the configuration screen.</p>

<h2>Importing existing data</h2>

<img src="/screens/screen-7.png" alt="GastandoYa import screen with CSV and PDF column mapping" />

<p>Besides Notion, GastandoYa imports data from <strong>CSV and PDF files</strong>. This is useful if you have bank statements or spreadsheets with financial history. The app automatically detects the column format and allows adjustments before importing.</p>

<h2>Tips for organizing finances in Notion</h2>

<p>To make the most of the integration, organize your Notion database with these properties:</p>

<ul>
<li>A <strong>title</strong> column for the transaction name</li>
<li>A <strong>date</strong> property for when it occurred</li>
<li>A <strong>number</strong> property for the amount</li>
<li>A <strong>select</strong> for the category (Food, Transportation, Entertainment, etc.)</li>
<li>A <strong>select</strong> for type (Income or Expense)</li>
</ul>

<h2>Integration security</h2>

<p>The connection between GastandoYa and Notion uses <strong>OAuth 2.0</strong>, the same protocol used by Google, Apple, and Microsoft. This means that:</p>

<ul>
<li>Your Notion credentials are never shared with the app</li>
<li>You control exactly which databases are accessible</li>
<li>You can revoke access at any time</li>
<li>Imported data is stored locally on your iPhone</li>
</ul>

<h2>Start the integration</h2>

<p>If you already use Notion to track expenses, integrating with GastandoYa is the natural next step. Gain charts, goals, and insights that transform raw data into <strong>real financial control</strong>.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Download GastandoYa on App Store</a>
`,
  },
  {
    slug: 'app-financas-nao-coleta-dados',
    title: "Finance App that Doesn't Collect your Data",
    excerpt: 'Understand how GastandoYa protects your financial privacy. Local storage, encrypted iCloud, and zero personal data collection.',
    coverImage: '/screens/screen-4.png',
    publishedAt: '2025-02-24',
    readingTime: '7 min',
    tags: ['Privacy', 'Security', 'iCloud'],
    content: `
<p>Your financial data is some of the most sensitive information that exists. It reveals where you live, what you consume, how much you earn, and how you spend. Yet most finance apps collect and store this information on their own servers. <strong>GastandoYa</strong> was built with a different philosophy: your data is yours, period.</p>

<h2>The problem with data collection in finance apps</h2>

<p>Many popular expense tracking apps:</p>

<ul>
<li>Require sign-up with email and password</li>
<li>Store transactions on the company's servers</li>
<li>Share aggregated data with third parties</li>
<li>Use your spending patterns to target ads</li>
<li>Can suffer data breaches that expose sensitive information</li>
</ul>

<p>Even with privacy policies, the simple fact that your data exists on an external server already represents a risk. Breaches happen, companies are sold, and policies change.</p>

<h2>How GastandoYa protects your privacy</h2>

<img src="/screens/screen-4.png" alt="GastandoYa secure iCloud sync screen" />

<p>GastandoYa adopts a radical approach to privacy:</p>

<ul>
<li><strong>Local storage:</strong> all data stays on your iPhone, using iOS secure storage</li>
<li><strong>No sign-up:</strong> we do not ask for email, name, phone number, or any personal data</li>
<li><strong>No proprietary servers:</strong> we have no database with user information</li>
<li><strong>No invasive analytics:</strong> we do not track how you use the app</li>
<li><strong>No ads:</strong> your spending profile is not sold</li>
</ul>

<h2>iCloud sync</h2>

<p>For those who want to use the app on multiple devices, sync is done exclusively via <strong>iCloud</strong>, Apple's cloud infrastructure:</p>

<ul>
<li>End-to-end encryption: not even Apple can read your data</li>
<li>Automatic sync between iPhone and iPad</li>
<li>Automatic backup that protects against device loss</li>
<li>You control what is synced in iOS settings</li>
</ul>

<img src="/screens/screen-1.png" alt="GastandoYa statistics dashboard with expense overview" />

<h2>Privacy comparison</h2>

<p>See how GastandoYa compares with other popular apps:</p>

<ul>
<li><strong>GastandoYa:</strong> local data + iCloud, no sign-up, no proprietary servers</li>
<li><strong>Traditional apps:</strong> data on company servers, mandatory sign-up, extensive analytics</li>
<li><strong>Banking apps:</strong> full access to your bank transactions, sharing with partners</li>
</ul>

<h2>Open Banking vs. Manual Tracking</h2>

<p>Some apps offer Open Banking integration to import transactions automatically. While convenient, this requires sharing access to your bank account with third parties. GastandoYa chose the path of <strong>manual recording and file import</strong> (CSV/PDF), prioritizing privacy over convenience.</p>

<p>For those who already organize expenses in Notion, the integration uses OAuth 2.0, which does not expose your credentials and allows revocation at any time.</p>

<h2>Total transparency</h2>

<p>GastandoYa is transparent about what it does and does not do with your data:</p>

<ul>
<li>Our privacy policy is clear and straightforward</li>
<li>We explicitly state that we do not collect personal data</li>
<li>The app works 100% offline after installation</li>
<li>Updates never add data collection</li>
</ul>

<h2>Protect your finances</h2>

<p>If privacy matters to you, choose a finance app that truly respects it. GastandoYa proves that it is possible to have <strong>complete financial control</strong> without giving up your privacy.</p>

<a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" class="cta-link">Download GastandoYa on App Store</a>
`,
  },
]

export function getBlogPosts(locale: Locale): BlogPost[] {
  return locale === 'en-US' ? blogPostsEnUS : blogPostsPtBR
}

export const blogPosts = blogPostsPtBR
