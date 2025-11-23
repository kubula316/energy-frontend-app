import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from 'recharts';
import type {DailyEnergyMix} from '../../types/energy.ts';
import type {FontSize} from '../../types/accessibility.ts';
import {CleanEnergyBadge} from '../shared';
import {ENERGY_SOURCE_COLORS, ENERGY_SOURCE_LABELS} from '../../constants/energyColors';
import {formatDate, getDateLabel} from '../../utils';
import {ChartTooltip} from './ChartTooltip';
import {ChartLegend} from './ChartLegend';

interface DailyEnergyMixChartProps {
    data: DailyEnergyMix;
    fontSize: FontSize;
}

export const DailyEnergyMixChart = ({data, fontSize}: DailyEnergyMixChartProps) => {

    const titleSize = {
        small: 'text-lg',
        medium: 'text-xl',
        large: 'text-2xl',
    }[fontSize];
    const dateSize = {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base',
    }[fontSize];

    const chartData = data.distribution.map((item) => ({
        name: ENERGY_SOURCE_LABELS[item.source],
        value: item.percentage,
        source: item.source,
    }));

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4">
                <h3 className={`${titleSize} font-bold text-gray-900 dark:text-white mb-2`}>
                    {getDateLabel(data.date)}
                </h3>
                <p className={`${dateSize} text-gray-600 dark:text-gray-400`}>
                    {formatDate(data.date)}
                </p>
            </div>

            <div className="flex justify-center mb-8 mt-2">
                <CleanEnergyBadge percentage={data.cleanEnergyPercentage} size="large"/>
            </div>

            <ResponsiveContainer width="100%" height={440}>
                <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" animationDuration={800}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={ENERGY_SOURCE_COLORS[entry.source]}/>
                        ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip/>}/>
                    <Legend content={(props) => <ChartLegend {...props} chartData={chartData}/>}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
