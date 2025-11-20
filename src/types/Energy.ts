export enum EnergySource {
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  HYDRO = 'HYDRO',
  COAL = 'COAL',
  GAS = 'GAS',
  NUCLEAR = 'NUCLEAR',
  BIOMASS = 'BIOMASS',
  OTHER = 'OTHER'
}

export interface GenerationMix {
  source: EnergySource;
  percentage: number;
}

export interface DailyEnergyMix {
  date: string;
  cleanEnergyPercentage: number;
  distribution: GenerationMix[];
}

export interface EnergyMixResponse {
  today: DailyEnergyMix;
  tomorrow: DailyEnergyMix;
  dayAfterTomorrow: DailyEnergyMix;
}

export interface OptimalChargingRequest {
  chargingDurationHours: number;
}

export interface OptimalChargingResponse {
  startDateTime: string;
  endDateTime: string;
  averageCleanEnergyPercentage: number;
}
