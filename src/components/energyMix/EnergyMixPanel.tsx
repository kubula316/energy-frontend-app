import {useEnergyMix} from '../../hooks';
import {DailyEnergyMixChart} from './DailyEnergyMixChart';
import {EnergyMixPanelHeader} from './EnergyMixPanelHeader';
import {EnergyMixPanelFooter} from './EnergyMixPanelFooter';
import {LoadingSpinner} from '../shared';
import {ErrorMessage} from '../shared';
import type {FontSize} from '../../types/Accessibility';

interface EnergyMixPanelProps {
    fontSize: FontSize;
}

export const EnergyMixPanel = ({fontSize}: EnergyMixPanelProps) => {
    const {data, loading, error, refetch} = useEnergyMix();

    if (loading) {
        return (
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex justify-center items-center py-20">
                    <LoadingSpinner size="large" message="Loading energy mix data..." fontSize={fontSize}/>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex justify-center items-center py-12">
                    <ErrorMessage error={error} onRetry={refetch}/>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex justify-center items-center py-20">
                    <p className="text-gray-600 dark:text-gray-400">
                        No data to display
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <EnergyMixPanelHeader fontSize={fontSize}/>

            <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {data.map((dailyMix) => (
                        <DailyEnergyMixChart key={dailyMix.date} data={dailyMix} fontSize={fontSize}/>
                    ))}
                </div>
            </div>

            <EnergyMixPanelFooter fontSize={fontSize}/>
        </div>
    );
};
