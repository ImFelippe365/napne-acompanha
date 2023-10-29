import React from 'react';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode,
  color?: 'success' | 'error' | 'base'
}

const Button = ({ children, color = 'base', ...props }: ButtonProps) => {

  const colorClass = color === 'base' ? 'bg-primary' : color === 'success' ? 'bg-success' : 'bg-error'   

  return (
    <button className={`text-white text-sm font-semibold py-2 px-6 rounded-lg transition-all hover:opacity-50 ${colorClass}`} {...props}>{children}</button>
  );
}

export default Button;