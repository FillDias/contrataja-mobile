import { useEffect, useCallback } from 'react';
import { useJobCallsStore } from '../../store/jobCallsStore';
import { useAuthStore } from '../../../auth/store/authStore';
import { socketService } from '../../../../services/socket/socketService';

export default function useHomePF() {
  const { user } = useAuthStore();
  const {
    candidateMatches,
    isLoading,
    fetchCandidateMatches,
    acceptJobCall,
    rejectJobCall,
    addMatch,
  } = useJobCallsStore();

  useEffect(() => {
    fetchCandidateMatches();

    if (user?.id) {
      socketService.connectJobCalls(user.id);
      socketService.onNewJobMatch((data) => {
        addMatch(data);
      });
    }

    return () => {
      socketService.disconnectJobCalls();
    };
  }, []);

  const handleAccept = useCallback(async (jobCallId: string) => {
    try {
      await acceptJobCall(jobCallId);
    } catch {
      // erro tratado no store
    }
  }, []);

  const handleReject = useCallback(async (jobCallId: string) => {
    try {
      await rejectJobCall(jobCallId);
    } catch {
      // erro tratado no store
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchCandidateMatches();
  }, []);

  return {
    candidateMatches,
    isLoading,
    handleAccept,
    handleReject,
    handleRefresh,
  };
}
