export const EnergySource = {
  SOLAR: 'SOLAR',
  WIND: 'WIND',
  HYDRO: 'HYDRO',
  COAL: 'COAL',
  GAS: 'GAS',
  NUCLEAR: 'NUCLEAR',
  BIOMASS: 'BIOMASS',
  IMPORTS: 'IMPORTS',
  OTHER: 'OTHER'
} as const;

export type EnergySource = typeof EnergySource[keyof typeof EnergySource];

export interface GenerationMix {
  source: EnergySource;
  percentage: number;
}

export interface DailyEnergyMix {
  date: string;
  cleanEnergyPercentage: number;
  distribution: GenerationMix[];
}

export interface ApiGenerationMix {
  hydro: number;
  other: number;
  biomass: number;
  imports: number;
  gas: number;
  solar: number;
  coal: number;
  nuclear: number;
  wind: number;
}

export interface ApiDailyEnergyMix {
  date: string;
  averageGenerationMix: ApiGenerationMix;
  cleanEnergyPercentage: number;
}

export type EnergyMixResponse = ApiDailyEnergyMix[];

export interface OptimalChargingResponse {
  averageCleanEnergyPercentage: number;
  endTime: string;
  startTime: string;
}


export const transformApiToDailyEnergyMix = (apiData: ApiDailyEnergyMix): DailyEnergyMix => {
  const distribution: GenerationMix[] = [
    { source: EnergySource.SOLAR, percentage: apiData.averageGenerationMix.solar },
    { source: EnergySource.WIND, percentage: apiData.averageGenerationMix.wind },
    { source: EnergySource.HYDRO, percentage: apiData.averageGenerationMix.hydro },
    { source: EnergySource.COAL, percentage: apiData.averageGenerationMix.coal },
    { source: EnergySource.GAS, percentage: apiData.averageGenerationMix.gas },
    { source: EnergySource.NUCLEAR, percentage: apiData.averageGenerationMix.nuclear },
    { source: EnergySource.BIOMASS, percentage: apiData.averageGenerationMix.biomass },
    { source: EnergySource.IMPORTS, percentage: apiData.averageGenerationMix.imports },
    { source: EnergySource.OTHER, percentage: apiData.averageGenerationMix.other },
  ].filter(item => item.percentage > 0);

  return {
    date: apiData.date,
    cleanEnergyPercentage: apiData.cleanEnergyPercentage,
    distribution,
  };
};
