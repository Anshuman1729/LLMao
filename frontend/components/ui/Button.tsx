import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
}

export function Button({ children, onClick, href, variant = 'primary', disabled, className = '' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02]',
    secondary: 'bg-pink-50 text-pink-700 hover:bg-pink-100',
    outline: 'border-2 border-pink-300 text-pink-700 hover:border-pink-500 hover:bg-pink-50',
  };

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
