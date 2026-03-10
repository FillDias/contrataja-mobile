import { useState, useCallback } from 'react';
import { profilesApi } from '../../services/profilesApi';
import { ProfilePF } from '../../../../types';

export type WorkModeFilter = 'REMOTO' | 'PRESENCIAL' | 'AMBOS' | '';
export type ExperienceFilter = '' | '0' | '1' | '3' | '5';

export default function useFindTalent() {
  const [professionals, setProfessionals] = useState<ProfilePF[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [query, setQuery] = useState('');
  const [workMode, setWorkMode] = useState<WorkModeFilter>('');
  const [minExperience, setMinExperience] = useState<ExperienceFilter>('');

  const search = useCallback(async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const params: Record<string, string> = {};
      if (query.trim()) params.query = query.trim();
      if (workMode) params.workMode = workMode;
      if (minExperience) params.minExperience = minExperience;

      const data = await profilesApi.searchProfessionals(params);
      setProfessionals(data);
    } catch {
      setProfessionals([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, workMode, minExperience]);

  const clearFilters = useCallback(() => {
    setWorkMode('');
    setMinExperience('');
  }, []);

  const totalExperience = (p: ProfilePF) =>
    p.experiences?.reduce((sum, e) => sum + e.years, 0) ?? 0;

  return {
    professionals,
    isLoading,
    hasSearched,
    query,
    setQuery,
    workMode,
    setWorkMode,
    minExperience,
    setMinExperience,
    search,
    clearFilters,
    totalExperience,
  };
}
