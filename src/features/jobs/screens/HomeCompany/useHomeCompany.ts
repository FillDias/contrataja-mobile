import { useEffect, useCallback } from 'react';
import { useJobCallsStore } from '../../store/jobCallsStore';
import { useAuthStore } from '../../../auth/store/authStore';
import { socketService } from '../../../../services/socket/socketService';

export default function useHomeCompany() {
  const { user } = useAuthStore();
  const {
    companyJobCalls,
    isLoading,
    loadingIds,
    fetchCompanyJobCalls,
    updateStatus,
    deleteJobCall,
  } = useJobCallsStore();

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

  return { companyJobCalls, isLoading, loadingIds, handleRefresh, updateStatus, deleteJobCall };
}
