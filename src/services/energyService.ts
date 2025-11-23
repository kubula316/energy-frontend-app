import { API_CONFIG } from '../config/api.config';
import type { EnergyMixResponse, OptimalChargingResponse, DailyEnergyMix } from '../types/energy.ts';
import { transformApiToDailyEnergyMix } from '../types/energy.ts';
import { ErrorCode, createAppError, mapHttpStatusToErrorCode } from '../types/errorCodes.ts';


async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  let response: Response;
  
  try {
    response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  } catch (error) {

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw createAppError(ErrorCode.NETWORK_ERROR, error as Error);
    }
    throw createAppError(ErrorCode.UNKNOWN_ERROR, error instanceof Error ? error : undefined);
  }
  if (!response.ok) {
    const errorCode = mapHttpStatusToErrorCode(response.status);
    throw createAppError(errorCode);
  }
  try {
    return await response.json();
  } catch (error) {
    throw createAppError(ErrorCode.UNKNOWN_ERROR, error instanceof Error ? error : undefined);
  }
}


export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
  const apiData = await fetchApi<EnergyMixResponse>(API_CONFIG.ENDPOINTS.MIX);
  return apiData.map(transformApiToDailyEnergyMix);
}


export async function getOptimalCharging(duration: number): Promise<OptimalChargingResponse> {
  const queryParams = new URLSearchParams({
    duration: duration.toString(),
  });
  return fetchApi<OptimalChargingResponse>(`${API_CONFIG.ENDPOINTS.OPTIMAL_CHARGING}?${queryParams}`);
}
