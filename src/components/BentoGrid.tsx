import React, { useState } from 'react'
import Button from './Button'
import TileImage from './TileImage'
import { BENTO_HIGHLIGHTS, PROMOS, type PromoCardItem } from '../data/content'

const promoHeightClasses = 'h-[500px] tablet:h-[490px] desktop:h-[580px]'

const promoTitleClasses =
  'text-[32px] font-semibold leading-9 tracking-[0.064px] tablet:text-[32px] tablet:leading-9 tablet:tracking-[0.064px] desktop:text-[40px] desktop:leading-[44px] desktop:tracking-normal'

const promoSubtitleClasses =
  'mt-[3px] text-[19px] leading-[23px] tracking-[0.231px] tablet:text-[19px] tablet:leading-[23px] desktop:text-[21px] desktop:leading-[25px]'

function PromoLogo({ item }: { item: PromoCardItem }) {
  if (!item.logoSrc) return null
  return (
    <img
      src={item.logoSrc}
      alt={item.logoAlt ?? ''}
      width={item.logoWidth}
      loading="lazy"
      className="h-auto max-w-[232px] select-none object-contain"
      style={{ width: item.logoWidth }}
    />
  )
}

function ProductPromoCard({ item }: { item: PromoCardItem }) {
  const dark = item.theme === 'dark'

  return (
    <section
      aria-label={item.logoAlt ?? item.title}
      className={`reveal-on-scroll is-visible group relative isolate overflow-hidden ${promoHeightClasses} ${
        dark ? 'text-mist' : 'text-ink'
      }`}
      style={{ backgroundColor: item.background }}
    >
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.018]">
        <TileImage
          images={item.images}
          alt={`${item.logoAlt ?? item.title} — Apple`}
          position="50% 50%"
        />
      </div>

      {item.split ? (
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-8 pb-10 pt-10 text-center tablet:pb-[44px] tablet:pt-[44px] desktop:pb-[53px] desktop:pt-[53px]">
          <div className="shrink-0">
            <PromoLogo item={item} />
          </div>
          <div className="mt-4 flex w-full max-w-[245px] flex-col items-center desktop:max-w-[330px]">
            <p className={promoSubtitleClasses}>{item.subtitle}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-[17px]">
              {item.ctas.map((cta) => (
                <Button
                  key={cta.label}
                  href={cta.href}
                  variant={cta.variant}
                  darkTheme={dark}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex h-full flex-col items-center px-8 pt-10 text-center tablet:pt-[44px] desktop:pt-[53px]">
          <div className="max-w-[320px] desktop:max-w-[360px]">
            {item.logoSrc ? (
              <div className="flex justify-center">
                <PromoLogo item={item} />
              </div>
            ) : (
              <h3 className={promoTitleClasses}>{item.title}</h3>
            )}
            <p className={promoSubtitleClasses}>{item.subtitle}</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-[17px]">
            {item.ctas.map((cta) => (
              <Button
                key={cta.label}
                href={cta.href}
                variant={cta.variant}
                darkTheme={dark}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export const BentoGrid: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [cameraCloseUp, setCameraCloseUp] = useState(false)
  const [displaySiriMode, setDisplaySiriMode] = useState(false)

  return (
    <div id="bento" className="mt-3">
      {/* 1. Authentic 2-Column Product Promo Grid from ./apple-clone */}
      <section
        aria-label="Featured products"
        className={`grid grid-cols-1 gap-3 px-0 tablet:grid-cols-2 tablet:px-3 desktop:grid-cols-2 desktop:px-3 ${
          darkMode ? 'bg-[#0a0a0c]' : 'bg-white'
        }`}
      >
        {PROMOS.map((item) => (
          <ProductPromoCard key={item.id} item={item} />
        ))}
      </section>

      {/* 2. Apple v2 Pro Technology Bento Grid (Real Apple Product Photos + rounded-3xl + hover lift) */}
      <section
        aria-label="iPhone 18 Pro Technology Highlights Bento Grid"
        className="bg-[#000000] text-mist py-16 tablet:py-20 desktop:py-24 px-4 tablet:px-6 mt-3"
      >
        <div className="mx-auto max-w-[1245px]">
          <div className="mb-10 tablet:mb-14 flex flex-col tablet:flex-row tablet:items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#2997ff] mb-2">
                Apple v2 Deep Dive • Pro Architecture
              </p>
              <h2 className="text-[32px] font-semibold leading-9 tablet:text-[48px] tablet:leading-[52px] desktop:text-[56px] desktop:leading-[60px] tracking-[-0.28px] text-white">
                Get the highlights.
              </h2>
            </div>
            <p className="text-[17px] leading-[25px] text-white/70 max-w-md">
              Explore the A20 Pro chip, variable-aperture 48MP Fusion camera, 35-hour battery life, and Apple Intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 desktop:grid-cols-12 gap-5">
            {BENTO_HIGHLIGHTS.map((card) => {
              const isCamera = card.id === 'camera'
              const isDisplay = card.id === 'display'
              const activeImg =
                isCamera && cameraCloseUp && card.secondaryImage
                  ? card.secondaryImage
                  : isDisplay && displaySiriMode && card.secondaryImage
                    ? card.secondaryImage
                    : card.image

              return (
                <article
                  key={card.id}
                  data-testid={`bento-card-${card.id}`}
                  className={`reveal-on-scroll is-visible card tile tile-rounded ${card.colSpan} group relative overflow-hidden rounded-3xl bg-[#161617] border border-white/10 min-h-[460px] tablet:min-h-[500px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl`}
                >
                  {/* Real Apple High-Res Photography Background */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={activeImg}
                      alt={card.title}
                      loading="lazy"
                      draggable="false"
                      className="h-full w-full select-none object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-black/80" />
                  </div>

                  {/* Top Copy */}
                  <div className="relative z-10 p-7 tablet:p-9">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-md">
                        {card.eyebrow}
                      </span>

                      {card.badgeIcon && (
                        <img
                          src={card.badgeIcon}
                          alt="A20 Pro Silicon"
                          className="h-10 w-10 rounded-lg object-cover border border-white/20"
                        />
                      )}
                    </div>

                    <h3 className="mt-4 text-[28px] leading-[32px] tablet:text-[36px] tablet:leading-[40px] font-semibold tracking-tight text-white max-w-xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[22px] text-white/80 max-w-lg">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Interactive Controls inside Bento Cards */}
                  <div className="relative z-10 p-7 tablet:p-9 pt-0 flex items-center justify-between gap-3">
                    {isCamera && (
                      <div className="inline-flex rounded-full bg-black/65 p-1 backdrop-blur-md border border-white/15">
                        <button
                          type="button"
                          onClick={() => setCameraCloseUp(false)}
                          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                            !cameraCloseUp ? 'bg-white text-black' : 'text-white/75 hover:text-white'
                          }`}
                        >
                          f/1.4 Wide Iris
                        </button>
                        <button
                          type="button"
                          onClick={() => setCameraCloseUp(true)}
                          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                            cameraCloseUp ? 'bg-white text-black' : 'text-white/75 hover:text-white'
                          }`}
                        >
                          f/4.0 Stopped Down
                        </button>
                      </div>
                    )}

                    {isDisplay && (
                      <div className="inline-flex rounded-full bg-black/65 p-1 backdrop-blur-md border border-white/15">
                        <button
                          type="button"
                          onClick={() => setDisplaySiriMode(false)}
                          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                            !displaySiriMode
                              ? 'bg-white text-black'
                              : 'text-white/75 hover:text-white'
                          }`}
                        >
                          Dynamic Island
                        </button>
                        <button
                          type="button"
                          onClick={() => setDisplaySiriMode(true)}
                          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                            displaySiriMode
                              ? 'bg-white text-black'
                              : 'text-white/75 hover:text-white'
                          }`}
                        >
                          Apple Intelligence
                        </button>
                      </div>
                    )}

                    {!isCamera && !isDisplay && (
                      <a
                        href="#compare"
                        className="inline-flex items-center rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-md transition-colors"
                      >
                        Compare full specs
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BentoGrid
