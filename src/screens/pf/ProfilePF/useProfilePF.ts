import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useUserStore } from '../../../store/userStore';
import { profilesApi } from '../../../services/api/profilesApi';
import { useAuthStore } from '../../../store/authStore';

export default function useProfilePF() {
  const { profile, fetchProfile, isLoading } = useUserStore();
  const { logout } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const profilePF = profile?.profilePF;
  const hasProfile = !!profilePF;

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = useCallback(async (data: any) => {
    setIsSaving(true);
    try {
      if (hasProfile) {
        await profilesApi.updateProfilePF(data);
      } else {
        await profilesApi.createProfilePF(data);
      }
      await fetchProfile();
      Alert.alert('Sucesso', 'Perfil salvo com sucesso!');
    } catch {
      Alert.alert('Erro', 'Nao foi possivel salvar o perfil');
    } finally {
      setIsSaving(false);
    }
  }, [hasProfile]);

  const handleAddExperience = useCallback(async (data: any) => {
    try {
      await profilesApi.addExperience(data);
      await fetchProfile();
    } catch {
      Alert.alert('Erro', 'Nao foi possivel adicionar experiencia');
    }
  }, []);

  const handleRemoveExperience = useCallback(async (id: string) => {
    try {
      await profilesApi.removeExperience(id);
      await fetchProfile();
    } catch {
      Alert.alert('Erro', 'Nao foi possivel remover experiencia');
    }
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar' },
      { text: 'Sair', onPress: logout, style: 'destructive' },
    ]);
  }, []);

  return {
    profile: profilePF,
    hasProfile,
    isLoading,
    isSaving,
    handleSaveProfile,
    handleAddExperience,
    handleRemoveExperience,
    handleLogout,
  };
}
