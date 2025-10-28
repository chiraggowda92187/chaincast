export default function isDevelopment (){
    const isDevelopment = window.location.hostname === 'localhost' ||
                      window.location.hostname.startsWith('192.168.') ||
                      window.location.hostname.startsWith('10.') ||
                      window.location.hostname.includes('dev') ||
                      window.location.hostname.includes('staging');
    return isDevelopment
}


export const backendUrl = isDevelopment() ? import.meta.env.VITE_DEV_BACKEND_URL : import.meta.env.VITE_PROD_BACKEND_URL