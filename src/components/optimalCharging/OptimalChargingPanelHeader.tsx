import type { FontSize } from '../../types/Accessibility';

interface OptimalChargingPanelHeaderProps {
  fontSize: FontSize;
}

export const OptimalChargingPanelHeader = ({ fontSize }: OptimalChargingPanelHeaderProps) => {
  const titleSize = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  }[fontSize];

  const iconSize = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  }[fontSize];

  const subtitleSize = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[fontSize];

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 px-8 py-6 border-b border-gray-200 dark:border-gray-600">
      <div className="flex items-center gap-3 mb-2">
        <span className={iconSize} role="img" aria-label="Ładowanie">
          🔋
        </span>
        <h2 className={`${titleSize} font-bold text-white`}>
          Kalkulator optymalnego ładowania
        </h2>
      </div>
      <p className={`${subtitleSize} text-white/90`}>
        Znajdź najlepszy czas na ładowanie pojazdu elektrycznego
      </p>
    </div>
  );
};
