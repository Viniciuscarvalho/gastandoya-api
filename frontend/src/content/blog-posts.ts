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

export const blogPosts: BlogPost[] = [
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
