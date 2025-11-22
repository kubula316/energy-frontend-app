import { EnergySource } from '../types/Energy';

export const ENERGY_SOURCE_COLORS: Record<EnergySource, string> = {
  [EnergySource.SOLAR]: '#FDB022',
  [EnergySource.WIND]: '#60A5FA',
  [EnergySource.HYDRO]: '#3B82F6',
  [EnergySource.COAL]: '#78716C',
  [EnergySource.GAS]: '#F87171',
  [EnergySource.NUCLEAR]: '#A78BFA',
  [EnergySource.BIOMASS]: '#34D399',
  [EnergySource.IMPORTS]: '#EC4899',
  [EnergySource.OTHER]: '#9CA3AF',
};

export const ENERGY_SOURCE_LABELS: Record<EnergySource, string> = {
  [EnergySource.SOLAR]: 'Słoneczna',
  [EnergySource.WIND]: 'Wiatrowa',
  [EnergySource.HYDRO]: 'Wodna',
  [EnergySource.COAL]: 'Węglowa',
  [EnergySource.GAS]: 'Gazowa',
  [EnergySource.NUCLEAR]: 'Nuklearna',
  [EnergySource.BIOMASS]: 'Biomasa',
  [EnergySource.IMPORTS]: 'Import',
  [EnergySource.OTHER]: 'Inne',
};


