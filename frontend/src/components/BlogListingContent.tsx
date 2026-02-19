'use client'

import Image from 'next/image'
import { useTranslation } from '@/i18n'
import { getBlogPosts } from '@/content/blog-posts'

export function BlogListingContent() {
  const { locale, t } = useTranslation()
  const posts = getBlogPosts(locale)
  const dateLocale = locale === 'en-US' ? 'en-US' : 'pt-BR'

  return (
    <div className="relative z-10 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="tag inline-flex items-center gap-2 mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          {t.blog.tag}
        </span>
        <h1 className="font-display text-section mb-6">
          {t.blog.titleStart}
          <span className="gradient-text">{t.blog.titleHighlight}</span>
        </h1>
        <p className="text-large text-neutral-400 max-w-2xl mx-auto">
          {t.blog.description}
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group relative"
          >
            <div className="glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:translate-y-[-4px] border-gradient h-full">
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[140px] md:w-[160px]">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={390}
                        height={844}
                        className="w-full h-auto rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
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
                  <h2 className="font-heading text-xl md:text-2xl mb-3 group-hover:text-emerald-100 transition-colors leading-tight">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
