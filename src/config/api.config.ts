export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  ENDPOINTS: {
    MIX: '/energy/mix',
    OPTIMAL_CHARGING: '/energy/optimal-charging'
  }
} as const;
