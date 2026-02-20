import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Resource API
export const resourceAPI = {
  getAll: () => api.get('/resources'),
  getById: (id: number) => api.get(`/resources/${id}`),
  create: (data: any) => api.post('/resources', data),
  update: (id: number, data: any) => api.put(`/resources/${id}`, data),
  delete: (id: number) => api.delete(`/resources/${id}`),
};

// Usage Session API
export const usageSessionAPI = {
  getAll: () => api.get('/usage-sessions'),
  getByResource: (resourceId: number) => api.get(`/usage-sessions/resource/${resourceId}`),
  getByUser: (userId: string) => api.get(`/usage-sessions/user/${userId}`),
  start: (data: any) => api.post('/usage-sessions/start', data),
  stop: (sessionId: number) => api.post('/usage-sessions/stop', { session_id: sessionId }),
};

// Billing API
export const billingAPI = {
  getAll: () => api.get('/billing'),
  getByUser: (userId: string) => api.get(`/billing/user/${userId}`),
  getUserTotal: (userId: string) => api.get(`/billing/user/${userId}/total`),
  getByResource: (resourceId: number) => api.get(`/billing/resource/${resourceId}`),
};

export default api;
