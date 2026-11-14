import React from 'react'

const base =
  'inline-flex h-9 select-none items-center justify-center whitespace-nowrap rounded-full px-[15px] text-center text-[14px] leading-none transition-all duration-200 tablet:h-11 tablet:px-[21px] tablet:text-[17px]'

const variants = {
  primary: 'bg-apple-blue text-white hover:bg-[#0077ed] shadow-xs',
  secondary:
    'border border-apple-link text-apple-link hover:bg-apple-link hover:text-white',
  secondaryDark:
    'border border-[#2997ff] text-[#2997ff] hover:bg-[#0077ed] hover:border-[#0077ed] hover:text-white',
}

interface ButtonProps {
  href: string
  variant?: 'primary' | 'secondary'
  darkTheme?: boolean
  className?: string
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = 'primary',
  darkTheme = false,
  className = '',
  children,
}) => {
  const variantClass =
    variant === 'secondary' && darkTheme
      ? variants.secondaryDark
      : variants[variant] ?? variants.primary

  return (
    <a href={href} className={`${base} ${variantClass} ${className}`}>
      {children}
    </a>
  )
}

export default Button
