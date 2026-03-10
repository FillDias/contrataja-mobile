import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserType } from '../../../types';
import { colors, spacing, radius, typography } from '../../../theme/colors';

const LOGO_WIDTH = Dimensions.get('window').width * 0.7;
const LOGO_HEIGHT = Math.round(LOGO_WIDTH / 3.6);

const userTypes = [
  {
    type: UserType.PF,
    title: 'Pessoa Fisica',
    description: 'Busque vagas de emprego e contrate servicos',
    icon: 'account-outline' as const,
  },
  {
    type: UserType.PJ_CONTRATANTE,
    title: 'Empresa',
    description: 'Crie vagas e encontre os melhores candidatos',
    icon: 'office-building-outline' as const,
  },
  {
    type: UserType.PJ_PRESTADOR,
    title: 'Prestador de Servico',
    description: 'Receba chamados de servicos na sua area',
    icon: 'wrench-outline' as const,
  },
  {
    type: UserType.INSTITUICAO,
    title: 'Instituicao de Ensino',
    description: 'Cadastre e venda cursos profissionalizantes',
    icon: 'school-outline' as const,
  },
];

export default function UserTypeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Como voce quer usar o app?</Text>
      </View>

      <View style={styles.grid}>
        {userTypes.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login', { userType: item.type })}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color={colors.accent}
              />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: spacing.md,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    alignSelf: 'center',
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
