import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Button from './Button'
import TileImage from './TileImage'
import { HEROES, PRO_COLOR_FINISHES, RIBBON, type HeroBannerItem } from '../data/content'

const heightClasses = 'h-[500px] tablet:h-[650px] desktop:h-[692px]'

function HeroBanner({ item, priority = false }: { item: HeroBannerItem; priority?: boolean }) {
  const dark = item.theme === 'dark'

  return (
    <section
      id={item.id}
      aria-label={item.title}
      className={`reveal-on-scroll is-visible relative isolate w-full overflow-hidden ${heightClasses} ${
        dark ? 'text-mist' : 'text-ink'
      }`}
      style={{ backgroundColor: item.background }}
    >
      <TileImage
        images={item.images}
        alt={`${item.title} — Apple`}
        priority={priority}
        position={item.imagePosition ?? '50% 30%'}
      />

      <div
        className={`relative z-10 flex h-full flex-col items-center px-8 text-center tablet:px-10 desktop:px-12 ${
          item.align === 'bottom'
            ? 'justify-end pb-10 tablet:pb-[61px] desktop:pb-14'
            : 'justify-start pt-10 tablet:pt-[61px] desktop:pt-14'
        }`}
      >
        <div className="max-w-[720px]">
          {item.badge && (
            <span
              className={`mb-2 inline-block rounded-full px-3 py-0.5 text-[11px] font-medium tracking-wide uppercase ${
                dark
                  ? 'bg-white/10 text-white/90 backdrop-blur-md'
                  : 'bg-black/[0.06] text-ink/80'
              }`}
            >
              {item.badge}
            </span>
          )}
          <h2 className="text-[32px] font-semibold leading-9 tracking-[0.064px] tablet:text-[48px] tablet:leading-[52px] tablet:tracking-[-0.096px] desktop:text-[56px] desktop:leading-[60px] desktop:tracking-[-0.28px]">
            {item.title}
          </h2>
          <p
            className={`mt-1.5 text-[19px] font-normal leading-[23px] tablet:text-[24px] tablet:leading-7 desktop:text-[28px] desktop:leading-8 ${
              item.subtitleClassName ?? ''
            }`}
          >
            {item.subtitle}
          </p>
        </div>

        <div className="mt-[17px] flex flex-wrap items-center justify-center gap-[17px]">
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
    </section>
  )
}

export const Hero: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [activeFinish, setActiveFinish] = useState(PRO_COLOR_FINISHES[0])
  const [showAllColorsPhoto, setShowAllColorsPhoto] = useState(false)

  return (
    <div id="hero">
      {/* Announcement Ribbon matching apple-clone Ribbon.jsx with Apple v2 branding */}
      <section
        aria-label="Announcement"
        className={`flex min-h-[52px] items-center justify-center px-6 py-3 text-center transition-colors duration-300 ${
          darkMode ? 'bg-[#1d1d1f] text-mist' : 'bg-white text-ink'
        }`}
      >
        <p className="text-[14px] leading-5">
          <span className="mr-2 inline-block rounded-full bg-apple-blue px-2 py-0.5 text-[11px] font-semibold text-white">
            {RIBBON.badge}
          </span>
          {RIBBON.text}{' '}
          <a
            href={RIBBON.href}
            className="inline-flex items-center whitespace-nowrap text-apple-link hover:underline"
          >
            {RIBBON.linkLabel}
            <ChevronRight className="ml-0.5 h-3.5 w-3.5" strokeWidth={2.2} />
          </a>
        </p>
      </section>

      {/* Hero Stack: Interactive Real-Photo iPhone 18 Pro Banner + 3 Apple Clone Full-Screen Heroes */}
      <div className={`space-y-3 ${darkMode ? 'bg-[#0a0a0c]' : 'bg-white'}`}>
        {/* 1. Interactive Real-Photo iPhone 18 Pro Hero with Color Switcher */}
        <section
          id="pro-color-studio"
          aria-label="iPhone 18 Pro Interactive Finish Studio"
          className="reveal-on-scroll is-visible relative isolate w-full overflow-hidden bg-black text-mist h-[640px] tablet:h-[720px] desktop:h-[760px]"
        >
          {/* Real Apple Product Photography Background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img
              key={showAllColorsPhoto ? 'all-colors' : activeFinish.id}
              src={showAllColorsPhoto ? './assets/apple/bento-colors.jpg' : activeFinish.image}
              alt={`iPhone 18 Pro — ${activeFinish.name}`}
              fetchPriority="high"
              draggable="false"
              className="h-full w-full select-none object-cover object-center transition-all duration-700 scale-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/15 to-black/85" />
          </div>

          {/* Top Headline & Learn more / Buy Pill Buttons */}
          <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-10 text-center tablet:px-10 tablet:py-12 desktop:px-12 desktop:py-14">
            <div className="max-w-[760px]">
              <span className="mb-2 inline-block rounded-full border border-white/15 bg-white/10 px-3 py-0.5 text-[11px] font-medium tracking-wider uppercase text-white/90 backdrop-blur-md">
                Apple Phiên Bản 2 • Interactive Studio
              </span>
              <h1 className="text-[32px] font-semibold leading-9 tracking-[0.064px] tablet:text-[48px] tablet:leading-[52px] tablet:tracking-[-0.096px] desktop:text-[56px] desktop:leading-[60px] desktop:tracking-[-0.28px]">
                iPhone 18 Pro
              </h1>
              <p className="mt-1.5 text-[19px] font-normal leading-[23px] text-white/90 tablet:text-[24px] tablet:leading-7 desktop:text-[28px] desktop:leading-8">
                Pro further. Grade 5 Titanium.
              </p>

              <div className="mt-[17px] flex flex-wrap items-center justify-center gap-[17px]">
                <Button href="#bento" variant="primary">
                  Learn more
                </Button>
                <Button href="#compare" variant="secondary" darkTheme>
                  Buy
                </Button>
              </div>
            </div>

            {/* Bottom Interactive Real-Photo Color Switcher Control */}
            <fieldset
              aria-label="Choose iPhone 18 Pro finish"
              className="z-20 flex flex-col items-center"
            >
              <legend className="sr-only">Choose iPhone 18 Pro Finish</legend>
              <p
                data-testid="active-color-label"
                className="mb-3 text-[13px] tablet:text-[14px] font-medium text-white/90 drop-shadow-xs"
              >
                {showAllColorsPhoto
                  ? 'All four Titanium finishes side by side'
                  : `${activeFinish.vnName} — ${activeFinish.caption}`}
              </p>

              <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-[#1d1d1f]/85 px-4 py-2 backdrop-blur-md shadow-2xl">
                {PRO_COLOR_FINISHES.map((finish) => {
                  const selected = !showAllColorsPhoto && activeFinish.id === finish.id
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      data-testid={`color-swatch-${finish.id}`}
                      onClick={() => {
                        setShowAllColorsPhoto(false)
                        setActiveFinish(finish)
                      }}
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-300 cursor-pointer ${
                        selected
                          ? 'bg-white/20 text-white ring-2 ring-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full shadow-inner"
                        style={{
                          backgroundColor: finish.swatchHex,
                          border: `1.5px solid ${finish.borderHex}`,
                        }}
                      />
                      <span>{finish.name.replace(' Titanium', '')}</span>
                    </button>
                  )
                })}

                <button
                  type="button"
                  data-testid="color-swatch-all"
                  onClick={() => setShowAllColorsPhoto(true)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-300 cursor-pointer ${
                    showAllColorsPhoto
                      ? 'bg-apple-blue text-white ring-2 ring-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  All Colors
                </button>
              </div>
            </fieldset>
          </div>
        </section>

        {/* 2. Authentic Full-Bleed Hero Banners from ./apple-clone (iPhone Duo, MacBook Pro, Holiday) */}
        {HEROES.map((hero, index) => (
          <HeroBanner key={hero.id} item={hero} priority={index === 0} />
        ))}
      </div>
    </div>
  )
}

export default Hero
