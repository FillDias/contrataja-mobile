import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useJobCallsStore } from '../../../store/jobCallsStore';

export default function useCreateJobCall(navigation: any) {
  const { createJobCall, isLoading } = useJobCallsStore();

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const result = await createJobCall({
        title: data.title,
        description: data.description,
        requirements: {
          requiredSkills: data.skills
            ? data.skills.split(',').map((s: string) => s.trim())
            : [],
          minExperience: data.minExperience ? parseInt(data.minExperience) : undefined,
          maxDistance: data.maxDistance ? parseInt(data.maxDistance) : undefined,
          driverLicense: data.driverLicense === 'true',
          gender: data.gender || undefined,
          minAge: data.minAge ? parseInt(data.minAge) : undefined,
          maxAge: data.maxAge ? parseInt(data.maxAge) : undefined,
        },
      });
      Alert.alert(
        'Vaga criada!',
        `${result.matchesCount} candidato(s) encontrado(s) pelo matching.`,
      );
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Nao foi possivel criar a vaga');
    }
  }, []);

  return { handleSubmit, isLoading };
}
