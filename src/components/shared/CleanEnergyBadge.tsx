interface CleanEnergyBadgeProps {
  percentage: number;
  size?: 'small' | 'medium' | 'large';
}

export const CleanEnergyBadge = ({percentage, size = 'medium'}: CleanEnergyBadgeProps) => {
  const getColorClasses = () => {
    if (percentage >= 70) {
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-200',
        border: 'border-green-300 dark:border-green-700',
        icon: '🌿',
      };
    } else if (percentage >= 50) {
      return {
        bg: 'bg-lime-100 dark:bg-lime-900/30',
        text: 'text-lime-800 dark:text-lime-200',
        border: 'border-lime-300 dark:border-lime-700',
        icon: '🍃',
      };
    } else if (percentage >= 30) {
      return {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-800 dark:text-yellow-200',
        border: 'border-yellow-300 dark:border-yellow-700',
        icon: '⚠️',
      };
    } else {
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-800 dark:text-red-200',
        border: 'border-red-300 dark:border-red-700',
        icon: '🔴',
      };
    }
  };

  const sizeClasses = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  const colors = getColorClasses();

  return (
    <div 
      className={`inline-flex items-center gap-2 rounded-full border ${colors.bg} ${colors.border} ${sizeClasses[size]} ${colors.text} font-semibold`}
      role="status"
      aria-label={`${percentage}% clean energy`}
    >
      <span aria-hidden="true">{colors.icon}</span>
      <span>{percentage.toFixed(1)}% clean energy</span>
    </div>
  );
};
