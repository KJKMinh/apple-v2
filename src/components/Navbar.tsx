import React, { useEffect, useRef, useState } from 'react'
import { ChevronRight, Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react'
import AppleLogo from './AppleLogo'
import { NAV_ITEMS } from '../data/content'

interface SearchFieldProps {
  autoFocus?: boolean
  onClose?: () => void
  darkNav?: boolean
}

function SearchField({ autoFocus = false, onClose, darkNav = false }: SearchFieldProps) {
  return (
    <form
      role="search"
      action="#compare"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault()
        onClose?.()
        document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <Search
        className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
          darkNav ? 'text-white/50' : 'text-black/40'
        }`}
        strokeWidth={2}
      />
      <input
        type="search"
        name="q"
        autoFocus={autoFocus}
        placeholder="Search apple.com — iPhone 18 Pro, iPhone Duo, MacBook Pro..."
        aria-label="Search apple.com"
        className={`h-11 w-full rounded-xl border pl-11 pr-4 text-[17px] shadow-xs outline-none focus:border-apple-blue ${
          darkNav
            ? 'border-white/15 bg-[#1d1d1f] text-white placeholder:text-white/40'
            : 'border-black/10 bg-white text-ink placeholder:text-black/40'
        }`}
      />
    </form>
  )
}

interface NavbarProps {
  darkMode?: boolean
  onToggleDarkMode?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode = false, onToggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const searchPanelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 735) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header id="globalheader" className="fixed inset-x-0 top-0 z-[9999]">
      <nav
        id="globalnav"
        aria-label="Global"
        className={`relative h-12 tablet:h-11 backdrop-blur-md backdrop-saturate-[180%] transition-colors duration-300 ${
          darkMode
            ? 'bg-[#161617]/80 text-[#f5f5f7] border-b border-white/[0.08]'
            : 'bg-[#f5f5f7]/80 text-ink border-b border-black/[0.06]'
        }`}
      >
        <div className="mx-auto flex h-full max-w-content items-center px-[22px]">
          <a
            href="#hero"
            aria-label="Apple"
            className={`flex h-full shrink-0 items-center gap-1.5 transition-opacity ${
              darkMode ? 'text-white/85 hover:text-white' : 'text-black/80 hover:text-black'
            }`}
          >
            <AppleLogo className="h-12 w-[17px] tablet:h-11 tablet:w-[14px]" />
            <span className="hidden wide:inline-block rounded-full bg-apple-blue/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-apple-blue">
              v2
            </span>
          </a>

          <ul className="ml-1 hidden h-full flex-1 items-center justify-between tablet:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="h-full">
                <a
                  href={item.href}
                  className={`flex h-full items-center px-2 text-[12px] leading-none tracking-[-0.01em] transition-colors ${
                    darkMode
                      ? 'text-white/80 hover:text-white'
                      : 'text-black/80 hover:text-black'
                  }`}
                >
                  {item.shortLabel ? (
                    <>
                      <span className="desktop:hidden">{item.shortLabel}</span>
                      <span className="hidden desktop:inline">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden h-full items-center gap-4 tablet:flex">
            {/* Quick Theme Switcher for Apple v2 */}
            {onToggleDarkMode && (
              <button
                type="button"
                onClick={onToggleDarkMode}
                aria-label="Toggle theme atmosphere"
                data-testid="theme-toggle-btn"
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/[0.06] text-ink hover:bg-black/10'
                }`}
              >
                {darkMode ? (
                  <>
                    <Sun className="h-3 w-3 text-amber-400" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3 w-3 text-ink" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              aria-label="Search apple.com"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((value) => !value)}
              className={`flex h-full items-center transition-colors cursor-pointer ${
                darkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
              }`}
            >
              {searchOpen ? (
                <X className="h-[15px] w-[15px]" strokeWidth={2.2} />
              ) : (
                <Search className="h-[15px] w-[15px]" strokeWidth={2.2} />
              )}
            </button>
            <a
              href="#compare"
              aria-label="Shopping Bag"
              className={`flex h-full items-center transition-colors ${
                darkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
              }`}
            >
              <ShoppingBag className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </a>
          </div>

          <div className="ml-auto flex h-full items-center gap-5 tablet:hidden">
            {onToggleDarkMode && (
              <button
                type="button"
                onClick={onToggleDarkMode}
                aria-label="Toggle theme"
                className={darkMode ? 'text-white/80' : 'text-black/80'}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <button
              type="button"
              aria-label="Search apple.com"
              onClick={() => {
                setMenuOpen(true)
                setSearchOpen(false)
              }}
              className={darkMode ? 'text-white/80' : 'text-black/80'}
            >
              <Search className="h-[17px] w-[17px]" strokeWidth={1.8} />
            </button>
            <a
              href="#compare"
              aria-label="Shopping Bag"
              className={darkMode ? 'text-white/80' : 'text-black/80'}
            >
              <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.8} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
              className={darkMode ? 'text-white/80' : 'text-black/80'}
            >
              {menuOpen ? (
                <X className="h-[19px] w-[19px]" strokeWidth={1.7} />
              ) : (
                <Menu className="h-[19px] w-[19px]" strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>

        <div
          ref={searchPanelRef}
          className={`absolute inset-x-0 top-full hidden overflow-hidden border-t backdrop-blur-xl transition-all duration-300 tablet:block ${
            darkMode
              ? 'border-white/10 bg-[#161617]/95'
              : 'border-black/[0.06] bg-[#f5f5f7]/95'
          } ${searchOpen ? 'max-h-32 opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}
        >
          <div className="mx-auto w-full max-w-[680px] px-6 py-5">
            <SearchField
              autoFocus={searchOpen}
              darkNav={darkMode}
              onClose={() => setSearchOpen(false)}
            />
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 bottom-0 top-12 z-[9998] overflow-y-auto px-8 pb-16 pt-6 transition-all duration-300 tablet:hidden ${
          darkMode ? 'bg-[#161617] text-white' : 'bg-[#f5f5f7] text-ink'
        } ${
          menuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <SearchField darkNav={darkMode} onClose={() => setMenuOpen(false)} />
        <ul className="mt-6 border-t border-black/10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="border-b border-black/10">
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3 text-[17px] font-semibold tracking-[-0.01em]"
              >
                {item.label}
                <ChevronRight className="h-4 w-4 opacity-40" strokeWidth={2} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
