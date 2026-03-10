import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../auth/store/authStore';
import { profilesApi } from '../../services/profilesApi';
import { ProfileCompany } from '../../../../types';

export default function usePerfilCompany() {
  const { user, logout } = useAuthStore();
  const [profile, setProfile] = useState<ProfileCompany | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cnpjVisible, setCnpjVisible] = useState(false);

  useEffect(() => {
    profilesApi
      .getMyProfileCompany()
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = () => {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const maskedCnpj = profile?.cnpj
    ? profile.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '••.•••.•••/$1$2-••')
    : '••.•••.•••/••••-••';

  return {
    user,
    profile,
    isLoading,
    cnpjVisible,
    setCnpjVisible,
    maskedCnpj,
    handleLogout,
  };
}
