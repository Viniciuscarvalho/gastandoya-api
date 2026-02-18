import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header, Footer, JsonLd } from '@/components'
import { blogPosts } from '@/content/blog-posts'
import { APP_STORE_URL, SITE_URL } from '@/content/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}/`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['GastandoYa'],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 390,
          height: 844,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'GastandoYa',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GastandoYa',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}/`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 px-6">
        {/* Background */}
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-15" />

        <article className="relative z-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Inicio</a>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <a href="/blog/" className="hover:text-white transition-colors">Blog</a>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-neutral-400 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Post Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-emerald-400 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime} de leitura
              </span>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          </header>

          {/* Cover Image */}
          <div className="flex justify-center mb-12">
            <div className="relative w-[200px] md:w-[240px]">
              <div className="absolute -inset-4 bg-gradient-to-b from-emerald-500/15 via-teal-500/8 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative glass-card rounded-[2rem] p-1.5">
                <Image
                  src={post.coverImage}
                  alt={`Screenshot do GastandoYa - ${post.title}`}
                  width={390}
                  height={844}
                  className="w-full h-auto rounded-[1.75rem]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg prose-blog max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Footer CTA */}
          <div className="mt-16 pt-8 border-t border-neutral-800/50">
            <div className="glass-card rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

              <div className="relative z-10">
                <h3 className="font-heading text-2xl md:text-3xl mb-4">
                  Comece a controlar seus gastos{' '}
                  <span className="gradient-text">agora</span>
                </h3>
                <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
                  Baixe o GastandoYa gratuitamente na App Store e transforme sua relacao com o dinheiro.
                </p>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 btn-primary px-8 py-4 rounded-full text-lg animate-glow"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  Baixar Gratis na App Store
                </a>
              </div>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-10 text-center">
            <a
              href="/blog/"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Voltar para o Blog
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
