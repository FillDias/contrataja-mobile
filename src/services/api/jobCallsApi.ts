import apiClient from './apiClient';
import { JobCall, JobMatch } from '../../types';

export const jobCallsApi = {
  async create(data: any): Promise<{ jobCall: JobCall; matchesCount: number; matchedUserIds: string[] }> {
    const response = await apiClient.post('/job-calls', data);
    return response.data;
  },

  async findByCompany(): Promise<JobCall[]> {
    const response = await apiClient.get('/job-calls/company');
    return response.data;
  },

  async findMatchesForCandidate(): Promise<JobMatch[]> {
    const response = await apiClient.get('/job-calls/candidate');
    return response.data;
  },

  async findById(id: string): Promise<JobCall> {
    const response = await apiClient.get(`/job-calls/${id}`);
    return response.data;
  },

  async accept(jobCallId: string): Promise<JobMatch> {
    const response = await apiClient.post(`/job-calls/${jobCallId}/accept`);
    return response.data;
  },

  async reject(jobCallId: string): Promise<JobMatch> {
    const response = await apiClient.post(`/job-calls/${jobCallId}/reject`);
    return response.data;
  },

  async findAllOpen(): Promise<JobCall[]> {
    const response = await apiClient.get('/job-calls/open/all');
    return response.data;
  },

  async apply(jobCallId: string): Promise<JobMatch> {
    const response = await apiClient.post(`/job-calls/${jobCallId}/apply`);
    return response.data;
  },
};
