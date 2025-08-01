// Configuration des URLs d'API selon l'environnement
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:5000' 
  : 'https://backend-immobilier.onrender.com';

export const API_ENDPOINTS = {
  // Google Calendar
  GOOGLE_STATUS: `${API_BASE_URL}/api/google/status`,
  GOOGLE_AUTH: `${API_BASE_URL}/auth/google`,
  GOOGLE_LOGOUT: `${API_BASE_URL}/api/google/logout`,
  GOOGLE_EVENTS: `${API_BASE_URL}/api/events`,
  
  // Biens/Listings
  BIENS: `${API_BASE_URL}/api/biens`,
  BIENS_WITH_CONTACTS: `${API_BASE_URL}/api/biens/with-contacts`,
};

export default API_BASE_URL; 