import React from 'react';
import { StyleSheet, ScrollView, Alert, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/forms/FormInput';
import { useAuthStore } from '../../store/authStore';
import { UserType } from '../../types';
import { colors, spacing, radius, typography } from '../../theme/colors';

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
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>ContrataJA</Text>
        <Text style={styles.title}>Entrar na sua conta</Text>
      </View>

      <View style={styles.form}>
        <FormInput name="email" control={control} label="Email" keyboardType="email-address" />
        <FormInput name="password" control={control} label="Senha" secureTextEntry />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Register', { userType })}
        >
          <Text style={styles.linkText}>Nao tem conta? <Text style={styles.linkBold}>Criar conta</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    padding: spacing.xxl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xxxl,
  },
  brand: {
    ...typography.h1,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    gap: spacing.xs,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.textOnAccent,
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  linkText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  linkBold: {
    color: colors.accent,
    fontWeight: '600',
  },
});
