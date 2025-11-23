import {useState} from 'react';
import type {FontSize} from '../../types/Accessibility';
import type {AppError} from '../../types/ErrorCodes';
import {MIN_CHARGING_HOURS, MAX_CHARGING_HOURS} from '../../hooks';
import {ErrorMessage} from '../shared';
import {ActionButton} from './ActionButton';
import {LoadingSpinner} from '../shared';
import type {FormEvent} from 'react';

interface OptimalChargingFormProps {
    onSubmit: (hours: number) => void;
    loading: boolean;
    error: AppError | Error | null;
    fontSize: FontSize;
}

export const OptimalChargingForm = ({onSubmit, loading, error, fontSize,}: OptimalChargingFormProps) => {
    const [hours, setHours] = useState<string>('3');

    const isValidHours = () => {
        const hoursNum = parseInt(hours, 10);
        return !isNaN(hoursNum) && hoursNum >= MIN_CHARGING_HOURS && hoursNum <= MAX_CHARGING_HOURS;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const hoursNum = parseInt(hours, 10);
        if (!isNaN(hoursNum)) {
            onSubmit(hoursNum);
        }
    };
    const labelSize = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    }[fontSize];

    const inputSize = {
        small: 'text-base',
        medium: 'text-lg',
        large: 'text-xl',
    }[fontSize];

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">

            <div>
                <label htmlFor="charging-hours"
                       className={`block ${labelSize} font-medium text-gray-700 dark:text-gray-300 mb-2`}>
                    How many hours do you need for charging?
                </label>
                <div className="relative">
                    <input
                        id="charging-hours"
                        type="number"
                        min={MIN_CHARGING_HOURS}
                        max={MAX_CHARGING_HOURS}
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className={`w-full ${inputSize} px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors`}
                        placeholder="e.g. 3"
                        aria-describedby="hours-help"
                    />
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${labelSize} text-gray-500 dark:text-gray-400`}>
                        hrs
                    </span>
                </div>
                <p id="hours-help" className={`mt-2 ${labelSize} text-gray-600 dark:text-gray-400`}>
                    Enter a number of hours from {MIN_CHARGING_HOURS} to {MAX_CHARGING_HOURS}
                </p>
            </div>

            {error && (<ErrorMessage error={error}/>)}

            <ActionButton
                type="submit"
                disabled={!isValidHours() || loading}
                loading={loading}
                variant="primary"
                fontSize={fontSize}
                icon={loading ? undefined : '🔍'}
            >
                {loading ? (<LoadingSpinner size="small"/>) : ('Find optimal time')}
            </ActionButton>
        </form>
    );
};
