import type { FontSize } from '../../types/accessibility.ts';

interface OptimalChargingPanelFooterProps {
  fontSize: FontSize;
}

export const OptimalChargingPanelFooter = ({ fontSize }: OptimalChargingPanelFooterProps) => {
  const textSize = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[fontSize];

  return (
      <div className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 px-8 py-4 border-t border-gray-200 dark:border-gray-600">
      <p className={`${textSize} text-white/90 text-center font-medium`}>
        Charge your car when renewable energy share is highest
      </p>
    </div>
  );
};
