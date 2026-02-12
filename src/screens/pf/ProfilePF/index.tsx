import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Chip, IconButton, Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../../components/forms/FormInput';
import Loading from '../../../components/common/Loading';
import useProfilePF from './useProfilePF';
import styles from './styles';

const profileSchema = z.object({
  fullName: z.string().min(3, 'Nome obrigatorio'),
  cpf: z.string().min(11, 'CPF invalido'),
  phone: z.string().min(10, 'Telefone invalido'),
  birthDate: z.string().min(1, 'Data de nascimento obrigatoria'),
  address: z.string().min(1, 'Endereco obrigatorio'),
  lat: z.string().min(1, 'Latitude obrigatoria'),
  lng: z.string().min(1, 'Longitude obrigatoria'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePF() {
  const {
    profile,
    hasProfile,
    isLoading,
    isSaving,
    handleSaveProfile,
    handleRemoveExperience,
    handleLogout,
  } = useProfilePF();

  const { control, handleSubmit } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.fullName ?? '',
      cpf: profile?.cpf ?? '',
      phone: profile?.phone ?? '',
      birthDate: profile?.birthDate?.split('T')[0] ?? '',
      address: profile?.address ?? '',
      lat: profile?.lat?.toString() ?? '',
      lng: profile?.lng?.toString() ?? '',
    },
  });

  if (isLoading) {
    return <Loading message="Carregando perfil..." />;
  }

  const onSubmit = (data: ProfileForm) => {
    handleSaveProfile({
      ...data,
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng),
      gender: 'OUTRO',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text variant="titleLarge" style={styles.title}>
        {hasProfile ? 'Editar perfil' : 'Criar perfil'}
      </Text>

      <View style={styles.section}>
        <FormInput name="fullName" control={control} label="Nome completo" />
        <FormInput name="cpf" control={control} label="CPF" keyboardType="numeric" />
        <FormInput name="phone" control={control} label="Telefone" keyboardType="phone-pad" />
        <FormInput name="birthDate" control={control} label="Data de nascimento" placeholder="YYYY-MM-DD" />
        <FormInput name="address" control={control} label="Endereco" />
        <FormInput name="lat" control={control} label="Latitude" keyboardType="numeric" />
        <FormInput name="lng" control={control} label="Longitude" keyboardType="numeric" />
      </View>

      {/* Competencias */}
      {profile?.skills && profile.skills.length > 0 && (
        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            Competencias
          </Text>
          <View style={styles.skillsRow}>
            {profile.skills.map((skill) => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </View>
        </View>
      )}

      {/* Experiencias */}
      {profile?.experiences && profile.experiences.length > 0 && (
        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            Experiencias
          </Text>
          {profile.experiences.map((exp) => (
            <Card key={exp.id} style={styles.expCard}>
              <Card.Title
                title={exp.title}
                subtitle={`${exp.company} - ${exp.years} ano(s)`}
                right={() => (
                  <IconButton
                    icon="delete"
                    onPress={() => handleRemoveExperience(exp.id)}
                  />
                )}
              />
            </Card>
          ))}
        </View>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSaving}
        disabled={isSaving}
      >
        {hasProfile ? 'Salvar alteracoes' : 'Criar perfil'}
      </Button>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutBtn}
        textColor="#f44336"
      >
        Sair da conta
      </Button>
    </ScrollView>
  );
}
