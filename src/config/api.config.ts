export const API_CONFIG = {
  BASE_URL: import.meta.env.API_BASE_URL || 'http://localhost:8080/api',
  ENDPOINTS: {
    MIX: '/energy/mix',
    OPTIMAL_CHARGING: '/energy/optimal-charging'
  }
} as const;
