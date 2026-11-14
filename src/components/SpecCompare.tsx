import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Button from './Button'
import { COMPARE_MODELS } from '../data/content'

export const SpecCompare: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [selectedStorage, setSelectedStorage] = useState<'256GB' | '512GB' | '1TB'>('256GB')
  const [upgradeBaseline, setUpgradeBaseline] = useState<'15pro' | '16pro' | '17pro'>('15pro')

  const upgradeGainText = {
    '15pro': {
      chip: 'Up to 45% faster CPU and 2x faster Ray Tracing with A20 Pro.',
      camera: 'All-new variable-aperture 48MP Main camera + 48MP Ultra Wide.',
      front: 'Center Stage front camera with AI group auto-framing.',
    },
    '16pro': {
      chip: 'Up to 30% faster neural processing and vapor-chamber cooling.',
      camera: 'Mechanical variable aperture (f/1.4–f/4.0) for natural bokeh.',
      front: '24MP TrueDepth front camera with Next-Gen Portraits.',
    },
    '17pro': {
      chip: 'Next-gen 2nm A20 Pro silicon with 20% higher memory bandwidth.',
      camera: 'Enhanced tetraprism optical zoom and ProRes RAW capture.',
      front: 'Ultra-wide Center Stage sensor with Studio Audio Mix.',
    },
  }[upgradeBaseline]

  return (
    <section
      id="compare"
      aria-label="Keep exploring iPhone lineup"
      className={`py-16 tablet:py-24 px-4 tablet:px-6 transition-colors duration-300 ${
        darkMode ? 'bg-[#111113] text-mist' : 'bg-[#f5f5f7] text-ink'
      }`}
    >
      <div className="mx-auto max-w-[1245px]">
        {/* Section Heading & Storage Capacity Switcher */}
        <div className="mb-12 flex flex-col tablet:flex-row tablet:items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-apple-blue mb-2">
              Compare the Lineup
            </p>
            <h2 className="text-[32px] font-semibold leading-9 tablet:text-[48px] tablet:leading-[52px] desktop:text-[56px] desktop:leading-[60px] tracking-[-0.28px]">
              Keep exploring iPhone.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[13px] opacity-70">Storage capacity:</span>
            <div
              className={`inline-flex rounded-full p-1 border ${
                darkMode
                  ? 'bg-[#1d1d1f] border-white/10'
                  : 'bg-white border-black/[0.08]'
              }`}
            >
              {(['256GB', '512GB', '1TB'] as const).map((cap) => (
                <button
                  key={cap}
                  type="button"
                  data-testid={`storage-btn-${cap}`}
                  onClick={() => setSelectedStorage(cap)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                    selectedStorage === cap
                      ? 'bg-apple-blue text-white shadow-xs'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Column Lineup Comparison Cards with Real Apple Product Images & Icons */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5">
          {COMPARE_MODELS.map((model) => (
            <article
              key={model.id}
              data-testid={`compare-col-${model.id}`}
              className={`reveal-on-scroll is-visible rounded-3xl p-6 tablet:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                darkMode
                  ? 'bg-[#1d1d1f] border border-white/10'
                  : 'bg-white border border-black/[0.06] shadow-xs'
              }`}
            >
              {/* Top Product Studio Photo & Identity */}
              <div className="flex flex-col items-center text-center">
                <div className="relative h-[230px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-white p-3">
                  <img
                    src={model.image}
                    alt={model.name}
                    loading="lazy"
                    className="max-h-[210px] w-auto object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Color Swatch Dots */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {model.swatches.map((hex, i) => (
                    <span
                      key={i}
                      className="h-3.5 w-3.5 rounded-full border border-black/20 shadow-2xs"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>

                <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-[#bf4800]">
                  {model.badge}
                </span>

                <h3 className="mt-1 text-[24px] leading-[28px] font-semibold">
                  {model.name}
                </h3>

                <p className="mt-1.5 text-[13px] leading-[18px] opacity-75 min-h-[36px]">
                  {model.tagline}
                </p>

                <p
                  data-testid={`price-${model.id}`}
                  className="mt-4 text-[17px] font-semibold"
                >
                  From {model.prices[selectedStorage]} ({selectedStorage})
                </p>

                <div className="mt-4 flex items-center justify-center gap-3 pb-6 border-b border-current/10 w-full">
                  <Button href="#pro-color-studio" variant="primary">
                    Buy
                  </Button>
                  <a
                    href="#bento"
                    className="inline-flex items-center text-[14px] text-apple-link hover:underline"
                  >
                    Learn more
                    <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Spec Tout Rows with Real Apple PNG Icons */}
              <div className="mt-6 space-y-6 text-center">
                {/* Screen Size */}
                <div>
                  <p className="text-[21px] font-semibold leading-tight">
                    {model.screenSize}
                  </p>
                  <p className="mt-1 text-[12px] opacity-75">{model.screenNote}</p>
                </div>

                {/* Chip Icon & Spec */}
                <div className="flex flex-col items-center">
                  <img
                    src={model.chipIcon}
                    alt={model.chipTitle}
                    loading="lazy"
                    className={`h-10 w-auto object-contain ${darkMode ? 'invert' : ''}`}
                  />
                  <p className="mt-2 text-[13px] font-semibold">{model.chipTitle}</p>
                  <p className="mt-0.5 text-[12px] opacity-75">{model.chipSub}</p>
                </div>

                {/* Camera Icon & Spec */}
                <div className="flex flex-col items-center">
                  <img
                    src={model.camIcon}
                    alt={model.camTitle}
                    loading="lazy"
                    className={`h-10 w-auto object-contain ${darkMode ? 'invert' : ''}`}
                  />
                  <p className="mt-2 text-[13px] font-semibold">{model.camTitle}</p>
                  <p className="mt-0.5 text-[12px] opacity-75">{model.camSub}</p>
                </div>

                {/* Battery Icon & Spec */}
                <div className="flex flex-col items-center">
                  <img
                    src={model.batteryIcon}
                    alt={model.batteryTitle}
                    loading="lazy"
                    className={`h-8 w-auto object-contain ${darkMode ? 'invert' : ''}`}
                  />
                  <p className="mt-2 text-[13px] font-semibold">{model.batteryTitle}</p>
                </div>

                {/* Apple Intelligence Icon */}
                <div className="flex flex-col items-center pt-2">
                  <img
                    src={model.aiIcon}
                    alt={model.aiTitle}
                    loading="lazy"
                    className="h-9 w-auto object-contain"
                  />
                  <p className="mt-1.5 text-[12px] font-medium">{model.aiTitle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Authentic Apple Upgrader Gallery (#upgrader-gallery) with Real Apple Photos */}
        <div className="mt-14 rounded-3xl bg-[#1d1d1f] text-mist p-7 tablet:p-10 border border-white/10">
          <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4 pb-7 border-b border-white/10">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#2997ff]">
                A Guided Upgrade Comparison
              </p>
              <h3 className="mt-1 text-[24px] tablet:text-[32px] font-semibold text-white">
                 Worth the upgrade? 100 percent.
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="upgrader-select" className="text-[13px] text-white/70">
                Select your current iPhone:
              </label>
              <select
                id="upgrader-select"
                value={upgradeBaseline}
                onChange={(e) =>
                  setUpgradeBaseline(e.target.value as '15pro' | '16pro' | '17pro')
                }
                className="rounded-full bg-black px-4 py-2 text-[14px] font-medium text-white border border-white/20 outline-none focus:border-[#2997ff] cursor-pointer"
              >
                <option value="15pro">iPhone 15 Pro</option>
                <option value="16pro">iPhone 16 Pro</option>
                <option value="17pro">iPhone 17 Pro</option>
              </select>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 tablet:grid-cols-3 gap-5">
            <div className="rounded-3xl bg-black p-6 flex flex-col justify-between overflow-hidden border border-white/[0.08]">
              <div>
                <p className="text-[12px] text-white/65">Silicon Performance</p>
                <p className="mt-1.5 text-[17px] font-semibold text-white">
                  {upgradeGainText.chip}
                </p>
              </div>
              <div className="mt-5 flex justify-center">
                <img
                  src="./assets/apple/upgrader-chip.jpg"
                  alt="A20 Pro Chip"
                  loading="lazy"
                  className="h-32 w-auto object-contain rounded-xl"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-black p-6 flex flex-col justify-between overflow-hidden border border-white/[0.08]">
              <div>
                <p className="text-[12px] text-white/65">Pro Camera System</p>
                <p className="mt-1.5 text-[17px] font-semibold text-white">
                  {upgradeGainText.camera}
                </p>
              </div>
              <div className="mt-5 flex justify-center">
                <img
                  src="./assets/apple/upgrader-cam.jpg"
                  alt="iPhone 18 Pro Rear Camera"
                  loading="lazy"
                  className="h-32 w-auto object-contain rounded-xl"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-black p-6 flex flex-col justify-between overflow-hidden border border-white/[0.08]">
              <div>
                <p className="text-[12px] text-white/65">Center Stage & AI</p>
                <p className="mt-1.5 text-[17px] font-semibold text-white">
                  {upgradeGainText.front}
                </p>
              </div>
              <div className="mt-5 flex justify-center">
                <img
                  src="./assets/apple/upgrader-front.jpg"
                  alt="iPhone 18 Pro Front Camera"
                  loading="lazy"
                  className="h-32 w-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecCompare
