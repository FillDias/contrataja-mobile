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

const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen({ navigation, route }: any) {
  const { userType } = route.params as { userType: UserType };
  const { login, isLoading } = useAuthStore();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
    } catch {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Entrar
      </Text>

      <FormInput name="email" control={control} label="Email" keyboardType="email-address" />
      <FormInput name="password" control={control} label="Senha" secureTextEntry />

      <Button label="Entrar" onPress={handleSubmit(onSubmit)} loading={isLoading} />

      <Button
        label="Criar conta"
        onPress={() => navigation.navigate('Register', { userType })}
        mode="text"
      />
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
    marginBottom: 24,
  },
});
