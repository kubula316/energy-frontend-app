import { useOptimalCharging } from '../../hooks';
import type { FontSize } from '../../types/Accessibility';
import { LoadingSpinner } from '../shared';
import { OptimalChargingPanelHeader } from './OptimalChargingPanelHeader';
import { OptimalChargingPanelFooter } from './OptimalChargingPanelFooter';
import { OptimalChargingForm } from './OptimalChargingForm';
import { OptimalChargingResult } from './OptimalChargingResult';
import { ActionButton } from './ActionButton';

interface OptimalChargingPanelProps {
  fontSize: FontSize;
}

export const OptimalChargingPanel = ({ fontSize }: OptimalChargingPanelProps) => {
  const { data, loading, error, fetchOptimalCharging, reset } = useOptimalCharging();

  const handleSubmit = async (hours: number) => {
    await fetchOptimalCharging(hours);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <OptimalChargingPanelHeader fontSize={fontSize} />

      <div className="p-8">
        {!data && (
          <>
            <OptimalChargingForm
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              fontSize={fontSize}
            />
            {loading && (
              <div className="flex justify-center py-12 mt-6">
                <LoadingSpinner size="large" message="Analyzing energy forecasts..." fontSize={fontSize}/>
              </div>
            )}
          </>
        )}

        {data && !loading && (
          <div className="max-w-md mx-auto space-y-4">
            <OptimalChargingResult data={data} fontSize={fontSize} />

            <ActionButton onClick={reset} variant="secondary" fontSize={fontSize} icon="🔄">
              Calculate again
            </ActionButton>
          </div>
        )}
      </div>

      <OptimalChargingPanelFooter fontSize={fontSize} />
    </div>
  );
};
