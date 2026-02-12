import { useEffect, useCallback } from 'react';
import { useJobCallsStore } from '../../../store/jobCallsStore';
import { useAuthStore } from '../../../store/authStore';
import { socketService } from '../../../services/socket/socketService';

export default function useHomeCompany() {
  const { user } = useAuthStore();
  const { companyJobCalls, isLoading, fetchCompanyJobCalls } = useJobCallsStore();

  useEffect(() => {
    fetchCompanyJobCalls();

    if (user?.id) {
      socketService.connectJobCalls(user.id);
      socketService.onJobAccepted(() => {
        fetchCompanyJobCalls();
      });
    }

    return () => {
      socketService.disconnectJobCalls();
    };
  }, []);

  const handleRefresh = useCallback(() => {
    fetchCompanyJobCalls();
  }, []);

  return { companyJobCalls, isLoading, handleRefresh };
}
