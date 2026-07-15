export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'https://api.m2phenom.com/v1',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};
