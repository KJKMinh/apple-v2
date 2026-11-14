import React from 'react';
import { FOOTER_COLUMNS, FOOTER_NOTES, LEGAL_LINKS } from '../data/content';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer
      aria-label="Apple Footer"
      className={`text-[12px] leading-[1.33337] tracking-[-0.01em] transition-colors duration-500 ${
        darkMode ? 'bg-[#111113] text-[#a1a1a6]' : 'bg-mist text-[#6e6e73]'
      }`}
    >
      <div className="mx-auto max-w-footer px-4 tablet:px-[22px]">
        {/* Footnotes */}
        <section
          aria-label="Footnotes"
          className={`border-b py-[17px] pb-[11px] ${
            darkMode ? 'border-white/[0.12]' : 'border-black/[0.16]'
          }`}
        >
          <ul className="space-y-[9.6px]">
            {FOOTER_NOTES.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </section>

        {/* Directory — accordions on mobile, 5 columns on tablet+ */}
        <nav aria-label="Apple Directory" className="pt-2 tablet:pt-5">
          {/* Mobile accordions */}
          <div className="tablet:hidden">
            {FOOTER_COLUMNS.flat().map((group) => (
              <details
                key={group.title}
                className={`group border-b ${
                  darkMode ? 'border-white/[0.12]' : 'border-black/[0.16]'
                }`}
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between py-2.5 text-[12px] font-normal ${
                    darkMode ? 'text-[#f5f5f7]' : 'text-ink'
                  }`}
                >
                  <span>{group.title}</span>
                  <span
                    aria-hidden="true"
                    className="text-[14px] leading-none text-[#6e6e73] transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ul className="space-y-2 pb-3 pl-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`hover:underline ${
                          darkMode ? 'text-[#a1a1a6] hover:text-white' : 'text-[#424245] hover:text-ink'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          {/* Desktop 5-column layout */}
          <div className="hidden tablet:grid tablet:grid-cols-5 tablet:gap-x-6">
            {FOOTER_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-6">
                {col.map((group) => (
                  <div key={group.title}>
                    <h3
                      className={`mb-[9.6px] text-[12px] font-semibold tracking-[-0.01em] ${
                        darkMode ? 'text-[#f5f5f7]' : 'text-ink'
                      }`}
                    >
                      {group.title}
                    </h3>
                    <ul className="space-y-[9.6px]">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className={`hover:underline ${
                              darkMode ? 'text-[#a1a1a6] hover:text-white' : 'text-[#424245] hover:text-ink'
                            }`}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </nav>

        {/* Shop callout */}
        <section
          className={`mt-6 border-b pb-3 pt-4 tablet:mt-9 ${
            darkMode ? 'border-white/[0.12]' : 'border-black/[0.16]'
          }`}
        >
          <p>
            More ways to shop:{' '}
            <a href="#store" className="text-apple-link underline">
              Find an Apple Store
            </a>{' '}
            or{' '}
            <a href="#retailer" className="text-apple-link underline">
              other retailer
            </a>{' '}
            near you. Or call{' '}
            <a href="tel:1-800-692-7753" className="text-apple-link underline">
              1-800-MY-APPLE
            </a>{' '}
            (1-800-692-7753).
          </p>
        </section>

        {/* Legal bar */}
        <section className="flex flex-col gap-2 py-4 pb-7 tablet:flex-row tablet:items-center tablet:justify-between">
          <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center tablet:gap-7">
            <p>Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved. (Apple Phiên Bản 2)</p>
            <ul className="flex flex-wrap items-center gap-y-1">
              {LEGAL_LINKS.map((link, idx) => (
                <li key={link.label} className="flex items-center">
                  <a
                    href={link.href}
                    className={`hover:underline ${
                      darkMode ? 'text-[#a1a1a6] hover:text-white' : 'text-[#424245] hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                  {idx < LEGAL_LINKS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`mx-2.5 ${darkMode ? 'text-white/25' : 'text-black/30'}`}
                    >
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="#choose-country"
            className={`hover:underline tablet:order-last ${
              darkMode ? 'text-[#a1a1a6] hover:text-white' : 'text-[#424245] hover:text-ink'
            }`}
          >
            United States
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
