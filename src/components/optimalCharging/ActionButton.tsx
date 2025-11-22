import type { FontSize } from '../../types/Accessibility';
import type {ReactNode} from "react";

type ButtonVariant = 'primary' | 'secondary';

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  fontSize: FontSize;
  icon?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export const ActionButton = ({ 
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  variant = 'primary',
  fontSize,
  icon,
  children,
  fullWidth = true,
}: ActionButtonProps) => {

  const buttonSize = {
    small: 'text-sm py-2 px-4',
    medium: 'text-base py-3 px-6',
    large: 'text-lg py-4 px-8',
  }[fontSize];

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transform hover:scale-105',
    secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${widthClass} ${buttonSize} ${variantClasses[variant]} font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 disabled:hover:scale-100`}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </button>
  );
};
