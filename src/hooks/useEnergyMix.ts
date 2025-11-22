import { useState, useEffect, useCallback } from 'react';
import { getEnergyMix } from '../services/EnergyService';
import type { DailyEnergyMix } from '../types/Energy';

interface UseEnergyMixReturn {
  data: DailyEnergyMix[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const normalizeError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error('Unknown error');
};

export const useEnergyMix = (autoFetch: boolean = true): UseEnergyMixReturn => {
  const [data, setData] = useState<DailyEnergyMix[] | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchEnergyMix = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {
      const result = await getEnergyMix();
      setData(result);
    } catch (err) {
      setError(normalizeError(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      void fetchEnergyMix();
    }
  }, [autoFetch, fetchEnergyMix]);

  return { data, loading, error, refetch: fetchEnergyMix };
};
