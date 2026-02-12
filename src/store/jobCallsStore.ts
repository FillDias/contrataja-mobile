import { create } from 'zustand';
import { JobCall, JobMatch } from '../types';
import { jobCallsApi } from '../services/api/jobCallsApi';

interface JobCallsState {
  // Para empresa
  companyJobCalls: JobCall[];
  // Para candidato PF
  candidateMatches: JobMatch[];
  isLoading: boolean;

  fetchCompanyJobCalls: () => Promise<void>;
  fetchCandidateMatches: () => Promise<void>;
  createJobCall: (data: any) => Promise<any>;
  acceptJobCall: (jobCallId: string) => Promise<void>;
  rejectJobCall: (jobCallId: string) => Promise<void>;
  addMatch: (match: JobMatch) => void;
}

export const useJobCallsStore = create<JobCallsState>((set, get) => ({
  companyJobCalls: [],
  candidateMatches: [],
  isLoading: false,

  fetchCompanyJobCalls: async () => {
    set({ isLoading: true });
    try {
      const data = await jobCallsApi.findByCompany();
      set({ companyJobCalls: data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchCandidateMatches: async () => {
    set({ isLoading: true });
    try {
      const data = await jobCallsApi.findMatchesForCandidate();
      set({ candidateMatches: data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  createJobCall: async (data) => {
    set({ isLoading: true });
    try {
      const result = await jobCallsApi.create(data);
      const current = get().companyJobCalls;
      set({ companyJobCalls: [result.jobCall, ...current], isLoading: false });
      return result;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  acceptJobCall: async (jobCallId) => {
    await jobCallsApi.accept(jobCallId);
    set({
      candidateMatches: get().candidateMatches.filter(
        (m) => m.jobCallId !== jobCallId,
      ),
    });
  },

  rejectJobCall: async (jobCallId) => {
    await jobCallsApi.reject(jobCallId);
    set({
      candidateMatches: get().candidateMatches.filter(
        (m) => m.jobCallId !== jobCallId,
      ),
    });
  },

  addMatch: (match) => {
    set({ candidateMatches: [match, ...get().candidateMatches] });
  },
}));
