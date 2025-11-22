import type { FontSize } from '../../types/Accessibility';

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
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 px-8 py-4 border-t border-gray-200 dark:border-gray-600">
      <p className={`${textSize} text-white/90 text-center font-medium`}>
        ⚡ Ładuj auto w czasie największego udziału energii odnawialnej
      </p>
    </div>
  );
};
