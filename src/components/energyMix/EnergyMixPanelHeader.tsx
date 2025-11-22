import type { FontSize } from '../../types/Accessibility';

interface EnergyMixPanelHeaderProps {
  fontSize: FontSize;
}

export const EnergyMixPanelHeader = ({ fontSize }: EnergyMixPanelHeaderProps) => {

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

  const metaSize = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[fontSize];

  const metaIconSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[fontSize];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 px-8 py-6 border-b border-gray-200 dark:border-gray-600">
      <div className="flex items-center gap-3 mb-2">
        <span className={`${iconSize}`} role="img" aria-label="Wykres">
          📊
        </span>
        <h2 className={`${titleSize} font-bold text-white`}>
          Prognoza miksu energetycznego
        </h2>
      </div>
      <div className={`flex items-center gap-4 ${metaSize} text-white/90`}>
        <span className="flex items-center gap-1.5">
          <span className={metaIconSize}>📅</span>
          Następne 3 dni
        </span>
        <span className="hidden sm:inline text-white/60">•</span>
        <span className="hidden sm:flex items-center gap-1.5">
          Dane dla UK
        </span>
      </div>
    </div>
  );
};
