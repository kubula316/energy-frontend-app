import { useState, useCallback } from 'react';
import { getOptimalCharging } from '../services/EnergyService';
import type { OptimalChargingResponse } from '../types/Energy';

interface UseOptimalChargingReturn {
  data: OptimalChargingResponse | null;
  loading: boolean;
  error: Error | null;
  fetchOptimalCharging: (hours: number) => Promise<void>;
  reset: () => void;
}

const MIN_CHARGING_HOURS = 1;
const MAX_CHARGING_HOURS = 6;

const normalizeError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error('Unknown error');
};

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

export const useOptimalCharging = (): UseOptimalChargingReturn => {
  const [data, setData] = useState<OptimalChargingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchOptimalCharging = useCallback(async (hours: number) => {

    setLoading(true);
    setError(null);

    try {
      validateChargingHours(hours);
      const result = await getOptimalCharging(hours);
      setData(result);
    } catch (err) {
      setError(normalizeError(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, fetchOptimalCharging, reset };
};

export { MIN_CHARGING_HOURS, MAX_CHARGING_HOURS };
