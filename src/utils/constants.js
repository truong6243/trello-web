let apiRoot = ''
if (import.meta.env.DEV) {
  apiRoot = 'http://localhost:8017'
}
if (import.meta.env.PROD) {
  apiRoot = import.meta.env.VITE_API_ROOT
}
export const API_ROOT = apiRoot
