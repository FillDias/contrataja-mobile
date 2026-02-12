import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { UserType } from '../../types';

const registerSchema = z
  .object({
    email: z.string().email('Email invalido'),
    password: z.string().min(6, 'Minimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Minimo 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas nao conferem',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const typeLabels: Record<string, string> = {
  PF: 'Pessoa Fisica',
  PJ_CONTRATANTE: 'Empresa',
  PJ_PRESTADOR: 'Prestador de Servico',
  INSTITUICAO: 'Instituicao de Ensino',
};

export default function RegisterScreen({ route }: any) {
  const { userType } = route.params as { userType: UserType };
  const { register, isLoading } = useAuthStore();

  const { control, handleSubmit } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register({
        email: data.email,
        password: data.password,
        type: userType,
      });
    } catch {
      Alert.alert('Erro', 'Nao foi possivel criar a conta');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Cadastro
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {typeLabels[userType]}
      </Text>

      <FormInput name="email" control={control} label="Email" keyboardType="email-address" />
      <FormInput name="password" control={control} label="Senha" secureTextEntry />
      <FormInput name="confirmPassword" control={control} label="Confirmar senha" secureTextEntry />

      <Button label="Cadastrar" onPress={handleSubmit(onSubmit)} loading={isLoading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6200ee',
    marginBottom: 24,
  },
});
