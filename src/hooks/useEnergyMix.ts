import { useState, useEffect } from 'react';
import { energyService } from '../services/EnergyService';
import type { EnergyMixResponse } from '../types/Energy';

interface UseEnergyMixState {
  data: EnergyMixResponse | null;
  loading: boolean;
  error: Error | null;
}

interface UseEnergyMixReturn extends UseEnergyMixState {
  refetch: () => Promise<void>;
}

export const useEnergyMix = (autoFetch: boolean = true): UseEnergyMixReturn => {
  const [state, setState] = useState<UseEnergyMixState>({
    data: null,
    loading: autoFetch,
    error: null,
  });

  const fetchEnergyMix = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await energyService.getEnergyMix();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchEnergyMix();
    }
  }, [autoFetch]);

  return {
    ...state,
    refetch: fetchEnergyMix,
  };
};
