import { API_CONFIG } from '../config/api.config';
import type {
  EnergyMixResponse,
  OptimalChargingRequest,
  OptimalChargingResponse
} from '../types/Energy.ts';

class EnergyService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  async getEnergyMix(): Promise<EnergyMixResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.MIX}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching energy mix:', error);
      throw error;
    }
  }

  async getOptimalCharging(
    request: OptimalChargingRequest
  ): Promise<OptimalChargingResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_CONFIG.ENDPOINTS.OPTIMAL_CHARGING}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching optimal charging:', error);
      throw error;
    }
  }
}

export const energyService = new EnergyService();
