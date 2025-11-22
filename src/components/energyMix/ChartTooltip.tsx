interface TooltipPayload {
    name: string;
    value: number;
    dataKey?: string;
    color?: string;
    payload?: unknown;
}

interface ChartTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
}

export const ChartTooltip = ({active, payload}: ChartTooltipProps) => {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    const data = payload[0];

    return (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 shadow-lg">
            <p className="text-gray-900 dark:text-white font-semibold">
                {data.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                {data.value.toFixed(1)}%
            </p>
        </div>
    );
};
