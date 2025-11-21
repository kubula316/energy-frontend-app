import { useState } from 'react';
import { energyService } from '../services/EnergyService';
import type {
  OptimalChargingRequest,
  OptimalChargingResponse,
} from '../types/Energy';

interface UseOptimalChargingState {
  data: OptimalChargingResponse | null;
  loading: boolean;
  error: Error | null;
}

interface UseOptimalChargingReturn extends UseOptimalChargingState {
  fetchOptimalCharging: (hours: number) => Promise<void>;
  reset: () => void;
}

const MIN_CHARGING_HOURS = 1;
const MAX_CHARGING_HOURS = 6;

export const useOptimalCharging = (): UseOptimalChargingReturn => {
  const [state, setState] = useState<UseOptimalChargingState>({
    data: null,
    loading: false,
    error: null,
  });

  const validateChargingHours = (hours: number): void => {
    if (!Number.isInteger(hours)) {
      throw new Error('Charging hours must be an integer');
    }
    if (hours < MIN_CHARGING_HOURS || hours > MAX_CHARGING_HOURS) {
      throw new Error(
        `Charging hours must be between ${MIN_CHARGING_HOURS} and ${MAX_CHARGING_HOURS}`
      );
    }
  };

  const fetchOptimalCharging = async (hours: number): Promise<void> => {
    try {
      validateChargingHours(hours);
      setState(prev => ({ ...prev, loading: true, error: null }));

      const request: OptimalChargingRequest = {
        chargingDurationHours: hours,
      };

      const data = await energyService.getOptimalCharging(request);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  };

  const reset = () => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...state,
    fetchOptimalCharging,
    reset,
  };
};

export { MIN_CHARGING_HOURS, MAX_CHARGING_HOURS };
