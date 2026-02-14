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
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>ContrataJA</Text>
        <Text style={styles.title}>Criar conta</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{typeLabels[userType]}</Text>
        </View>
      </View>

      <View style={styles.form}>
        <FormInput name="email" control={control} label="Email" keyboardType="email-address" />
        <FormInput name="password" control={control} label="Senha" secureTextEntry />
        <FormInput name="confirmPassword" control={control} label="Confirmar senha" secureTextEntry />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Text>
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
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  brand: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  badgeText: {
    ...typography.label,
    color: colors.accent,
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
});
