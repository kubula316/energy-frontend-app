interface LegendPayloadItem {
    value?: string;
    id?: string;
    type?: string;
    color?: string;
    payload?: unknown;
}

interface ChartLegendProps {
    payload?: readonly LegendPayloadItem[];
    chartData: Array<{
        name: string;
        value: number;
        source: string;
    }>;
}

export const ChartLegend = ({payload, chartData}: ChartLegendProps) => {
    if (!payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}/>
                    <span className="text-gray-700 dark:text-gray-300">
                        {entry.value}: {chartData[index].value.toFixed(1)}%
                    </span>
                </div>
            ))}
        </div>
    );
};
