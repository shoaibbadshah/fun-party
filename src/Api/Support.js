import { api } from './index';

export default {
  createCase: (body) => api.post('/users/create_case', body),
  fetchAllCases: () => api.get('/users/get_all_cases'),
  sendSuportMessage: (body) => api.post('/users/create_case_message', body),
  fetchCaseDetails: (id) => api.get(`/users/get_case/${id}`),
};
