import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Medical Services
export const getMedicalServices = () => api.get('/medicalservice');
export const getMedicalServiceById = (id) => api.get(`/medicalservice/${id}`);
export const createMedicalService = (data) => api.post('/medicalservice', data);
export const updateMedicalService = (id, data) => api.put(`/medicalservice/${id}`, data);
export const deleteMedicalService = (id) => api.delete(`/medicalservice/${id}`);

// Lab Tests
export const getLabTests = () => api.get('/labtest');
export const getLabTestById = (id) => api.get(`/labtest/${id}`);
export const createLabTest = (data) => api.post('/labtest', data);
export const updateLabTest = (id, data) => api.put(`/labtest/${id}`, data);
export const deleteLabTest = (id) => api.delete(`/labtest/${id}`);

// Test Requests
export const getTestRequests = () => api.get('/testrequest');
export const getTestRequestById = (id) => api.get(`/testrequest/${id}`);
export const createTestRequest = (data) => api.post('/testrequest', data);
export const updateTestRequest = (id, data) => api.put(`/testrequest/${id}`, data);
export const deleteTestRequest = (id) => api.delete(`/testrequest/${id}`);

// Test Results
export const getTestResults = () => api.get('/testresult');
export const getTestResultById = (id) => api.get(`/testresult/${id}`);
export const createTestResult = (data) => api.post('/testresult', data);
export const updateTestResult = (id, data) => api.put(`/testresult/${id}`, data);
export const deleteTestResult = (id) => api.delete(`/testresult/${id}`);

export default api; 