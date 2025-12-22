'use client'

import { features } from '@/content/features'
import { PhoneMock } from './PhoneMock'

export function FeatureSection() {
  return (
    <section id="funcionalidades" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tudo que você precisa para{' '}
            <span className="gradient-text">controlar suas finanças</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Funcionalidades pensadas para simplificar sua vida financeira
          </p>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Phone Mock */}
              <div className="flex-1 flex justify-center">
                <PhoneMock
                  imageSrc={feature.image}
                  alt={`${feature.title} ${feature.subtitle}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {feature.title}{' '}
                  <span className="gradient-text">{feature.subtitle}</span>
                </h3>
                <p className="text-lg text-neutral-400 mb-6 max-w-lg mx-auto lg:mx-0">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-neutral-800 text-neutral-300 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}




