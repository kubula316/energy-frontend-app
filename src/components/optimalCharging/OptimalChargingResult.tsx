import type { OptimalChargingResponse } from '../../types/Energy';
import type { FontSize } from '../../types/Accessibility';
import { formatDateWithTime } from '../../utils';
import { CleanEnergyBadge } from '../shared';

interface OptimalChargingResultProps {
  data: OptimalChargingResponse;
  fontSize: FontSize;
}

export const OptimalChargingResult = ({ data, fontSize }: OptimalChargingResultProps) => {
  const titleSize = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
  }[fontSize];

  const labelSize = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[fontSize];

  const timeSize = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl',
  }[fontSize];

  const iconSize = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  }[fontSize];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-700">
      <div className="flex items-center gap-3 mb-4">
        <span className={`${iconSize}`} role="img" aria-label="Sukces">
          ⚡
        </span>
        <h3 className={`${titleSize} font-bold text-gray-900 dark:text-white`}>
          Optymalny czas ładowania
        </h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <p className={`${labelSize} text-gray-600 dark:text-gray-400 mb-1`}>
            🕐 Rozpocznij ładowanie
          </p>
          <p className={`${timeSize} font-bold text-green-600 dark:text-green-400`}>
            {formatDateWithTime(data.startTime)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <p className={`${labelSize} text-gray-600 dark:text-gray-400 mb-1`}>
            🏁 Zakończ ładowanie
          </p>
          <p className={`${timeSize} font-bold text-blue-600 dark:text-blue-400`}>
            {formatDateWithTime(data.endTime)}
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <CleanEnergyBadge 
            percentage={data.averageCleanEnergyPercentage} 
            size="large"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
          <p className={`${labelSize} text-blue-800 dark:text-blue-200 text-center`}>
            💡 W tym czasie dostępność czystej energii będzie najwyższa
          </p>
        </div>
      </div>
    </div>
  );
};
