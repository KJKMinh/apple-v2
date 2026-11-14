export interface NavItem {
  label: string
  shortLabel?: string
  href: string
}

export interface ResponsiveImageSet {
  sm: string
  md: string
  lg: string
}

export interface CTAItem {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}

export interface HeroBannerItem {
  id: string
  theme: 'dark' | 'light'
  background: string
  badge?: string
  title: string
  subtitle: string
  subtitleClassName?: string
  align: 'top' | 'bottom'
  imagePosition?: string
  images: ResponsiveImageSet
  ctas: CTAItem[]
}

export interface PromoCardItem {
  id: string
  theme: 'dark' | 'light'
  background: string
  split?: boolean
  title?: string
  logoSrc?: string
  logoAlt?: string
  logoWidth?: number
  subtitle: string
  images: ResponsiveImageSet
  ctas: CTAItem[]
}

export interface ProColorFinish {
  id: 'burgundy' | 'glacier' | 'silver' | 'black'
  name: string
  vnName: string
  swatchHex: string
  borderHex: string
  caption: string
  image: string
  heroImage?: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Store', href: '#hero' },
  { label: 'Mac', href: '#macbook-pro' },
  { label: 'iPad', href: '#bento' },
  { label: 'iPhone', href: '#iphone-duo' },
  { label: 'Watch', href: '#bento' },
  { label: 'Vision', href: '#bento' },
  { label: 'AirPods', href: '#bento' },
  { label: 'TV & Home', shortLabel: 'Home', href: '#entertainment' },
  { label: 'Entertainment', href: '#entertainment' },
  { label: 'Accessories', href: '#compare' },
  { label: 'Support', href: '#footer' },
]

export const RIBBON = {
  badge: 'Apple v2 Edition',
  text: 'Experience the new iPhone 18 Pro, iPhone Duo, and M-Series Mac lineup with interactive real-photo finish preview.',
  linkLabel: 'Explore interactive color studio',
  href: '#pro-color-studio',
}

const img = (name: string): ResponsiveImageSet => ({
  sm: `./assets/apple/${name}-sm.jpg`,
  md: `./assets/apple/${name}-md.jpg`,
  lg: `./assets/apple/${name}-lg.jpg`,
})

export const PRO_COLOR_FINISHES: ProColorFinish[] = [
  {
    id: 'burgundy',
    name: 'Burgundy Titanium',
    vnName: 'Titan Đỏ Rượu (Sa Mạc Đậm)',
    swatchHex: '#4a1c24',
    borderHex: '#7d3a46',
    caption: 'Burgundy — Deep anodized titanium plateau with variable-aperture 48MP Fusion camera.',
    image: './assets/apple/color-burgundy.jpg',
    heroImage: './assets/apple/hero-iphone18pro.jpg',
  },
  {
    id: 'glacier',
    name: 'Glacier Titanium',
    vnName: 'Titan Xanh Băng (Tự Nhiên)',
    swatchHex: '#a3b1c4',
    borderHex: '#c6d2e1',
    caption: 'Glacier — Cool metallic ice-blue Grade 5 titanium with precision micro-blasted texture.',
    image: './assets/apple/color-glacier.jpg',
  },
  {
    id: 'silver',
    name: 'Silver Titanium',
    vnName: 'Titan Trắng Bạc',
    swatchHex: '#d9dadb',
    borderHex: '#f5f5f7',
    caption: 'Silver — Radiant brushed silver-white titanium with color-infused matte back glass.',
    image: './assets/apple/color-silver.jpg',
  },
  {
    id: 'black',
    name: 'Black Titanium',
    vnName: 'Titan Đen Không Gian',
    swatchHex: '#1d1d1f',
    borderHex: '#48484a',
    caption: 'Black — Stealth carbon-black titanium seamlessly framing the Super Retina XDR display.',
    image: './assets/apple/color-black.jpg',
  },
]

export const HEROES: HeroBannerItem[] = [
  {
    id: 'iphone-duo',
    theme: 'light',
    background: '#f5f5f7',
    badge: 'Apple v2 Flagship',
    title: 'iPhone Duo',
    subtitle: 'Hello, hello. Unfold the future of Apple Intelligence.',
    align: 'top',
    images: img('hero-duo'),
    ctas: [
      { label: 'Learn more', href: '#bento', variant: 'primary' },
      { label: 'Buy', href: '#compare', variant: 'secondary' },
    ],
  },
  {
    id: 'macbook-pro',
    theme: 'dark',
    background: '#000000',
    badge: 'M-Series Pro & Max',
    title: 'MacBook Pro',
    subtitle: 'PROLED XDR Display',
    subtitleClassName:
      'bg-gradient-to-r from-[#2997ff] via-[#9b8cff] to-[#ff7a45] bg-clip-text text-transparent font-medium',
    align: 'top',
    images: img('hero-mac'),
    ctas: [
      { label: 'Learn more', href: '#bento', variant: 'primary' },
      { label: 'Buy', href: '#compare', variant: 'secondary' },
    ],
  },
  {
    id: 'holiday-2026',
    theme: 'dark',
    background: '#5a122c',
    badge: 'Apple v2 Gift Collection',
    title: 'Gifts they’ll love.',
    subtitle: 'Find their perfect match this season.',
    align: 'bottom',
    images: img('hero-holiday'),
    ctas: [
      { label: 'Shop gifts', href: '#bento', variant: 'primary' },
      { label: 'Compare lineup', href: '#compare', variant: 'secondary' },
    ],
  },
]

export const PROMOS: PromoCardItem[] = [
  {
    id: 'iphone-18-pro',
    theme: 'dark',
    background: '#000000',
    title: 'iPhone 18 Pro',
    subtitle: 'Pro further.',
    images: img('promo-iphone'),
    ctas: [
      { label: 'Learn more', href: '#pro-color-studio', variant: 'primary' },
      { label: 'Buy', href: '#compare', variant: 'secondary' },
    ],
  },
  {
    id: 'apple-watch-series-12',
    theme: 'dark',
    background: '#000000',
    split: true,
    logoSrc: './assets/apple/logo-watch.png',
    logoAlt: 'Apple Watch Series 12',
    logoWidth: 232,
    subtitle: 'The most accurate heart rate sensing in a wearable.¹',
    images: img('promo-watch'),
    ctas: [
      { label: 'Learn more', href: '#compare', variant: 'primary' },
      { label: 'Buy', href: '#compare', variant: 'secondary' },
    ],
  },
  {
    id: 'ipad',
    theme: 'light',
    background: '#f5f5f7',
    title: 'iPad',
    subtitle: 'Now with the speed of the A16 chip and double the starting storage.',
    images: img('promo-ipad'),
    ctas: [
      { label: 'Learn more', href: '#compare', variant: 'primary' },
      { label: 'Buy', href: '#compare', variant: 'secondary' },
    ],
  },
  {
    id: 'airpods-pro-3',
    theme: 'light',
    background: '#f5f5f7',
    title: 'AirPods Pro 3',
    subtitle: 'The world’s best in-ear Active Noise Cancellation.',
    images: img('promo-airpods'),
    ctas: [
      { label: 'Learn more', href: '#compare', variant: 'primary' },
      { label: 'Buy', href: '#compare', variant: 'secondary' },
    ],
  },
  {
    id: 'apple-upgrade',
    theme: 'light',
    background: '#f5f5f7',
    logoSrc: './assets/apple/logo-apple-upgrade.png',
    logoAlt: 'Apple Upgrade',
    logoWidth: 150,
    subtitle: 'Love it. Lease it. Upgrade it.²',
    images: img('promo-upgrade'),
    ctas: [
      { label: 'Learn more', href: '#compare', variant: 'primary' },
    ],
  },
  {
    id: 'apple-card',
    theme: 'light',
    background: '#f5f5f7',
    logoSrc: './assets/apple/logo-apple-card.png',
    logoAlt: 'Apple Card',
    logoWidth: 94,
    subtitle: 'Get up to 3% Daily Cash back with every purchase.',
    images: img('promo-card'),
    ctas: [
      { label: 'Learn more', href: '#compare', variant: 'primary' },
      { label: 'Apply now', href: '#compare', variant: 'secondary' },
    ],
  },
]

export const BENTO_HIGHLIGHTS = [
  {
    id: 'chip',
    eyebrow: 'A20 Pro Silicon',
    title: 'A20 Pro chip. Speed that redefines Pro.',
    description:
      'Next-generation 2nm-class architecture with hardware-accelerated ray tracing and vapor-chamber thermal design.',
    image: './assets/apple/bento-chip.jpg',
    badgeIcon: './assets/apple/upgrader-chip.jpg',
    colSpan: 'desktop:col-span-7',
  },
  {
    id: 'camera',
    eyebrow: 'Variable Aperture Camera',
    title: '48MP Fusion camera with mechanical aperture.',
    description:
      'Precision-engineered iris blades adjust depth of field naturally with optical-quality zoom across every focal length.',
    image: './assets/apple/bento-camera.jpg',
    secondaryImage: './assets/apple/bento-aperture.jpg',
    colSpan: 'desktop:col-span-5',
  },
  {
    id: 'battery',
    eyebrow: 'All-Day Pro Stamina',
    title: 'Up to 35 hours of video playback.',
    description:
      'High-density stacked battery architecture paired with A20 Pro power management delivers our longest battery life ever.',
    image: './assets/apple/bento-battery.jpg',
    colSpan: 'desktop:col-span-6',
  },
  {
    id: 'display',
    eyebrow: 'Super Retina XDR & Apple Intelligence',
    title: 'Thinnest borders. Smarter Dynamic Island.',
    description:
      'ProMotion 120Hz Always-On display seamlessly integrated with contextual Siri and on-device visual intelligence.',
    image: './assets/apple/bento-display.jpg',
    secondaryImage: './assets/apple/bento-siri.jpg',
    colSpan: 'desktop:col-span-6',
  },
]

export const COMPARE_MODELS = [
  {
    id: 'iphone-18-pro',
    name: 'iPhone 18 Pro',
    badge: 'Ultimate Pro',
    tagline: 'The pinnacle of titanium design, A20 Pro silicon, and variable-aperture pro camera.',
    image: './assets/apple/contrast-iphone-18-pro.jpg',
    swatches: ['#4a1c24', '#a3b1c4', '#d9dadb', '#1d1d1f'],
    prices: {
      '256GB': '$1,099',
      '512GB': '$1,299',
      '1TB': '$1,499',
    },
    screenSize: '6.3″ or 6.9″',
    screenNote: 'Super Retina XDR display with ProMotion 120Hz',
    chipIcon: './assets/apple/icon-chip-a20pro.png',
    chipTitle: 'A20 Pro chip',
    chipSub: '6‑core GPU with hardware-accelerated ray tracing',
    camIcon: './assets/apple/icon-cam-pro.png',
    camTitle: 'Pro camera system',
    camSub: '48MP Main with variable aperture • 48MP Ultra Wide • 5x Telephoto',
    batteryIcon: './assets/apple/icon-battery.png',
    batteryTitle: 'Up to 35 hours video playback',
    aiIcon: './assets/apple/icon-ai.png',
    aiTitle: 'Built for Apple Intelligence',
  },
  {
    id: 'iphone-duo',
    name: 'iPhone Duo',
    badge: 'All-New Form Factor',
    tagline: 'Expansive unfolded dual-canvas display engineered with ultra-thin titanium hinge.',
    image: './assets/apple/contrast-iphone-duo.jpg',
    swatches: ['#d9dadb', '#1d1d1f', '#a3b1c4'],
    prices: {
      '256GB': '$1,599',
      '512GB': '$1,799',
      '1TB': '$1,999',
    },
    screenSize: '7.9″ Unfolded',
    screenNote: 'Dual-canvas Super Retina XDR with ProMotion',
    chipIcon: './assets/apple/icon-chip-a20pro.png',
    chipTitle: 'A20 Pro chip',
    chipSub: 'Multi-window desktop-class graphics engine',
    camIcon: './assets/apple/icon-cam-duo.png',
    camTitle: 'Pro Dual-Fold camera system',
    camSub: '48MP Fusion Main • 48MP Ultra Wide • Rear-screen Continuity framing',
    batteryIcon: './assets/apple/icon-battery.png',
    batteryTitle: 'Up to 31 hours video playback',
    aiIcon: './assets/apple/icon-ai.png',
    aiTitle: 'Built for Apple Intelligence',
  },
  {
    id: 'iphone-air',
    name: 'iPhone Air',
    badge: 'Featherlight Design',
    tagline: 'Impossibly thin profile with flagship performance and all-day battery life.',
    image: './assets/apple/contrast-iphone-air.jpg',
    swatches: ['#c2d7e8', '#f2f1ed', '#1d1d1f'],
    prices: {
      '256GB': '$899',
      '512GB': '$1,099',
      '1TB': '$1,299',
    },
    screenSize: '6.6″ Ultra-Thin',
    screenNote: 'Super Retina XDR display with ProMotion 120Hz',
    chipIcon: './assets/apple/icon-chip-a19pro.png',
    chipTitle: 'A19 Pro chip',
    chipSub: '5‑core GPU • High-efficiency neural architecture',
    camIcon: './assets/apple/icon-cam-air.png',
    camTitle: '48MP 2-in-1 Fusion camera',
    camSub: 'Super-high-resolution photos (24MP and 48MP) • 2x optical-quality Telephoto',
    batteryIcon: './assets/apple/icon-battery.png',
    batteryTitle: 'Up to 27 hours video playback',
    aiIcon: './assets/apple/icon-ai.png',
    aiTitle: 'Built for Apple Intelligence',
  },
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    badge: 'Everyday Powerhouse',
    tagline: 'Vibrant color-infused glass, Dual Fusion cameras, and next-gen speed.',
    image: './assets/apple/contrast-iphone-17.jpg',
    swatches: ['#d6c5e8', '#a3b1c4', '#f5f5f7', '#1d1d1f'],
    prices: {
      '256GB': '$799',
      '512GB': '$999',
      '1TB': '$1,199',
    },
    screenSize: '6.1″ or 6.7″',
    screenNote: 'Super Retina XDR display • Dynamic Island',
    chipIcon: './assets/apple/icon-chip-a19.png',
    chipTitle: 'A19 chip',
    chipSub: '5‑core GPU • 16‑core Neural Engine',
    camIcon: './assets/apple/icon-cam-17.png',
    camTitle: 'Dual Fusion camera system',
    camSub: '48MP Fusion Main • 12MP Ultra Wide • Macro photography',
    batteryIcon: './assets/apple/icon-battery.png',
    batteryTitle: 'Up to 26 hours video playback',
    aiIcon: './assets/apple/icon-ai.png',
    aiTitle: 'Built for Apple Intelligence',
  },
]

export const ENTERTAINMENT = [
  {
    title: 'Stick',
    note: 'Comedy',
    detail: 'New season.',
    image: './assets/apple/ent-stick.jpg',
    imageSm: './assets/apple/ent-stick-sm.jpg',
  },
  {
    title: 'Nocturne',
    note: 'Crime',
    detail: 'The only way to save a villain’s missing victim is to get close enough to risk becoming one.',
    image: './assets/apple/ent-nocturne.jpg',
    imageSm: './assets/apple/ent-nocturne-sm.jpg',
  },
  {
    title: 'Formula 1',
    note: 'Live sports',
    detail: 'Every Grand Prix, live.',
    image: './assets/apple/ent-f1.jpg',
    imageSm: './assets/apple/ent-f1-sm.jpg',
  },
  {
    title: 'Awkwafina: The Unlikely Cook',
    note: 'Documentary',
    detail: 'Awkwafina sets off on a culinary road trip to revive her family’s restaurant.',
    image: './assets/apple/ent-awkwafina.jpg',
    imageSm: './assets/apple/ent-awkwafina-sm.jpg',
  },
  {
    title: 'MLS',
    note: 'Live sports',
    detail: 'Every match. Every week.',
    image: './assets/apple/ent-mls.jpg',
    imageSm: './assets/apple/ent-mls-sm.jpg',
  },
  {
    title: 'Tenzing',
    note: 'Drama',
    detail: 'Based on the true story of the thrilling quest to summit Everest for the first time.',
    image: './assets/apple/ent-tenzing.jpg',
    imageSm: './assets/apple/ent-tenzing-sm.jpg',
  },
]

export const FOOTER_COLUMNS = [
  [
    {
      title: 'Shop and Learn',
      links: [
        { label: 'Store', href: '#hero' },
        { label: 'Mac', href: '#macbook-pro' },
        { label: 'iPad', href: '#bento' },
        { label: 'iPhone', href: '#iphone-duo' },
        { label: 'Watch', href: '#bento' },
        { label: 'Vision', href: '#bento' },
        { label: 'AirPods', href: '#bento' },
        { label: 'Home', href: '#entertainment' },
        { label: 'AirTag', href: '#bento' },
        { label: 'Accessories', href: '#compare' },
        { label: 'Gift Cards', href: '#hero' },
      ],
    },
    {
      title: 'Apple Wallet',
      links: [
        { label: 'Wallet', href: '#bento' },
        { label: 'Apple Card', href: '#bento' },
        { label: 'Apple Pay', href: '#bento' },
        { label: 'Apple Cash', href: '#bento' },
      ],
    },
  ],
  [
    {
      title: 'Account',
      links: [
        { label: 'Manage Your Apple Account', href: '#footer' },
        { label: 'Apple Store Account', href: '#footer' },
        { label: 'iCloud.com', href: '#footer' },
      ],
    },
    {
      title: 'Entertainment',
      links: [
        { label: 'Apple One', href: '#entertainment' },
        { label: 'Apple TV+', href: '#entertainment' },
        { label: 'Apple Music', href: '#entertainment' },
        { label: 'Apple Arcade', href: '#entertainment' },
        { label: 'Apple Fitness+', href: '#entertainment' },
        { label: 'Apple News+', href: '#entertainment' },
        { label: 'Apple Podcasts', href: '#entertainment' },
        { label: 'Apple Books', href: '#entertainment' },
        { label: 'App Store', href: '#entertainment' },
      ],
    },
  ],
  [
    {
      title: 'Apple Store',
      links: [
        { label: 'Find a Store', href: '#footer' },
        { label: 'Genius Bar', href: '#footer' },
        { label: 'Today at Apple', href: '#footer' },
        { label: 'Group Reservations', href: '#footer' },
        { label: 'Apple Camp', href: '#footer' },
        { label: 'Apple Store App', href: '#footer' },
        { label: 'Certified Refurbished', href: '#compare' },
        { label: 'Apple Upgrade', href: '#bento' },
        { label: 'Apple Trade In', href: '#compare' },
        { label: 'Financing', href: '#compare' },
        { label: 'Carrier Deals at Apple', href: '#compare' },
        { label: 'Order Status', href: '#footer' },
        { label: 'Shopping Help', href: '#footer' },
      ],
    },
  ],
  [
    {
      title: 'For Business',
      links: [
        { label: 'Apple and Business', href: '#footer' },
        { label: 'Shop for Business', href: '#footer' },
      ],
    },
    {
      title: 'For Education',
      links: [
        { label: 'Apple and Education', href: '#footer' },
        { label: 'Shop for K-12', href: '#footer' },
        { label: 'Shop for College', href: '#footer' },
      ],
    },
    {
      title: 'For Healthcare',
      links: [{ label: 'Apple and Healthcare', href: '#footer' }],
    },
    {
      title: 'For Government',
      links: [
        { label: 'Apple and Government', href: '#footer' },
        { label: 'Shop for Veterans and Military', href: '#footer' },
        { label: 'Shop for State and Local Employees', href: '#footer' },
        { label: 'Shop for Federal Employees', href: '#footer' },
      ],
    },
  ],
  [
    {
      title: 'Apple Values',
      links: [
        { label: 'Accessibility', href: '#footer' },
        { label: 'Education', href: '#footer' },
        { label: 'Environment', href: '#footer' },
        { label: 'Inclusion and Diversity', href: '#footer' },
        { label: 'Privacy', href: '#footer' },
        { label: 'Racial Equity and Justice', href: '#footer' },
        { label: 'Supply Chain Innovation', href: '#footer' },
      ],
    },
    {
      title: 'About Apple',
      links: [
        { label: 'Newsroom', href: '#footer' },
        { label: 'Apple Leadership', href: '#footer' },
        { label: 'Career Opportunities', href: '#footer' },
        { label: 'Investors', href: '#footer' },
        { label: 'Ethics & Compliance', href: '#footer' },
        { label: 'Events', href: '#footer' },
        { label: 'Contact Apple', href: '#footer' },
      ],
    },
  ],
]

export const FOOTER_NOTES = [
  '1. Based on data from an Apple-conducted study of heart rate accuracy, during July and August 2026, utilizing commercially available best-selling wearables available as of June 2026. For more information, visit apple.com/HRAccuracy.',
  '2. Apple Upgrade is a device leasing program available in the U.S. (excluding U.S. territories). Leases are provided by Klarna: subject to eligibility and credit approval, including final approval at checkout. Device must be in good condition upon return; damage fees may apply.',
  '3. To access and use all Apple Card features and products available only to Apple Card users, you must add Apple Card to Wallet on an iPhone or iPad that supports and has the latest version of iOS or iPadOS. Apple Card is subject to credit approval, available only for qualifying applicants in the United States, and issued by Goldman Sachs Bank USA, Salt Lake City Branch.',
  '4. A subscription is required for Apple Arcade, Apple Fitness+, Apple Music, and Apple TV+. Features are subject to change. Some features, applications, and services may not be available in all regions or all languages.',
]

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#footer' },
  { label: 'Terms of Use', href: '#footer' },
  { label: 'Sales and Refunds', href: '#footer' },
  { label: 'Legal', href: '#footer' },
  { label: 'Site Map', href: '#footer' },
]
