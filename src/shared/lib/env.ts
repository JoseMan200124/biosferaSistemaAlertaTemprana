export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  pollingKpisMs: Number(process.env.NEXT_PUBLIC_POLLING_KPIS_MS ?? '60000'),
  pollingAlertsMs: Number(process.env.NEXT_PUBLIC_POLLING_ALERTS_MS ?? '60000'),
  pollingForecastMs: Number(process.env.NEXT_PUBLIC_POLLING_FORECAST_MS ?? '300000'),
};
