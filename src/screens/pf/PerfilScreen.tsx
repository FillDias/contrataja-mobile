import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../theme/colors';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';

const MOCK_SKILLS = [
  'React Native', 'TypeScript', 'Node.js', 'Python',
  'Elétrica Residencial', 'NR-10', 'Gestão de Projetos',
];

const MOCK_EXPERIENCES = [
  {
    id: '1',
    role: 'Desenvolvedor Mobile',
    company: 'TechSoft Soluções',
    period: 'Jan 2024 - Presente',
    description: 'Desenvolvimento de aplicativos mobile com React Native e TypeScript.',
  },
  {
    id: '2',
    role: 'Desenvolvedor Full Stack Jr.',
    company: 'Startup Digital',
    period: 'Mar 2022 - Dez 2023',
    description: 'Desenvolvimento web com React, Node.js e PostgreSQL.',
  },
];

const MOCK_EDUCATIONS = [
  {
    id: '1',
    degree: 'Bacharelado em Ciência da Computação',
    institution: 'Universidade Federal de São Paulo',
    period: '2018 - 2022',
  },
  {
    id: '2',
    degree: 'Técnico em Eletrotécnica',
    institution: 'SENAI São Paulo',
    period: '2016 - 2017',
  },
];

export default function PerfilScreen() {
  const { logout } = useAuthStore();
  const { profile } = useUserStore();
  const profilePF = profile?.profilePF;

  const displayName = profilePF?.fullName || profile?.name || 'Usuário ContrataJá';
  const displayRole = profilePF?.headline || 'Profissional';
  const displayCity = profilePF?.city || 'São Paulo, SP';

  const experiences = profilePF?.experiences?.length
    ? profilePF.experiences.map((e: any) => ({
        id: e.id,
        role: e.role,
        company: e.company,
        period: `${e.startDate || ''} - ${e.endDate || 'Presente'}`,
        description: e.description || '',
      }))
    : MOCK_EXPERIENCES;

  const educations = profilePF?.educations?.length
    ? profilePF.educations.map((e: any) => ({
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        period: `${e.startYear || ''} - ${e.endYear || ''}`,
      }))
    : MOCK_EDUCATIONS;

  const skills = profilePF?.skills?.length ? profilePF.skills : MOCK_SKILLS;

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair da conta?', [
      { text: 'Cancelar' },
      { text: 'Sair', onPress: logout, style: 'destructive' },
    ]);
  };

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover + Profile Photo */}
        <View style={s.coverSection}>
          <View style={s.cover} />
          <View style={s.profilePhotoWrap}>
            <View style={s.profilePhoto}>
              <MaterialCommunityIcons name="account" size={48} color={colors.textMuted} />
            </View>
          </View>
        </View>

        {/* Name + Info */}
        <View style={s.nameSection}>
          <Text style={s.name}>{displayName}</Text>
          <Text style={s.role}>{displayRole}</Text>
          <View style={s.locationRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={16} color={colors.textMuted} />
            <Text style={s.locationText}>{displayCity}</Text>
          </View>

          <View style={s.statsRow}>
            <View style={s.stat}>
              <Text style={s.statNumber}>{experiences.length}</Text>
              <Text style={s.statLabel}>Experiências</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statNumber}>{educations.length}</Text>
              <Text style={s.statLabel}>Formações</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statNumber}>{skills.length}</Text>
              <Text style={s.statLabel}>Habilidades</Text>
            </View>
          </View>
        </View>

        {/* Qualifications Summary */}
        {profilePF?.qualificationsSummary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Resumo</Text>
            <Text style={s.sectionText}>{profilePF.qualificationsSummary}</Text>
          </View>
        )}

        {/* Currículo Section */}
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons name="file-document-outline" size={20} color={colors.primary} />
          <Text style={s.sectionHeaderTitle}>Currículo</Text>
        </View>

        {/* Experiências */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Experiência Profissional</Text>
          {experiences.map((exp: any, index: number) => (
            <View
              key={exp.id}
              style={[s.itemCard, index < experiences.length - 1 && s.itemCardBorder]}
            >
              <View style={s.itemIconWrap}>
                <MaterialCommunityIcons name="briefcase" size={18} color={colors.primary} />
              </View>
              <View style={s.itemContent}>
                <Text style={s.itemTitle}>{exp.role}</Text>
                <Text style={s.itemSubtitle}>{exp.company}</Text>
                <Text style={s.itemPeriod}>{exp.period}</Text>
                {exp.description ? (
                  <Text style={s.itemDescription}>{exp.description}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* Formação */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Formação Acadêmica</Text>
          {educations.map((edu: any, index: number) => (
            <View
              key={edu.id}
              style={[s.itemCard, index < educations.length - 1 && s.itemCardBorder]}
            >
              <View style={s.itemIconWrap}>
                <MaterialCommunityIcons name="school" size={18} color={colors.primary} />
              </View>
              <View style={s.itemContent}>
                <Text style={s.itemTitle}>{edu.degree}</Text>
                <Text style={s.itemSubtitle}>{edu.institution}</Text>
                <Text style={s.itemPeriod}>{edu.period}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Habilidades */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Habilidades</Text>
          <View style={s.skillsWrap}>
            {skills.map((skill: string, i: number) => (
              <View key={i} style={s.skillChip}>
                <Text style={s.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Conta Section */}
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons name="cog-outline" size={20} color={colors.primary} />
          <Text style={s.sectionHeaderTitle}>Conta</Text>
        </View>

        <View style={s.menuSection}>
          <TouchableOpacity style={s.menuItem}>
            <MaterialCommunityIcons name="pencil-outline" size={22} color={colors.text} />
            <Text style={s.menuText}>Editar Perfil</Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={s.menuItem}>
            <MaterialCommunityIcons name="shield-check-outline" size={22} color={colors.text} />
            <Text style={s.menuText}>Privacidade</Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={s.menuItem}>
            <MaterialCommunityIcons name="bell-cog-outline" size={22} color={colors.text} />
            <Text style={s.menuText}>Notificações</Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={s.menuItem}>
            <MaterialCommunityIcons name="help-circle-outline" size={22} color={colors.text} />
            <Text style={s.menuText}>Ajuda e Suporte</Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={[s.menuItem, s.menuItemLast]} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={22} color={colors.error} />
            <Text style={[s.menuText, { color: colors.error }]}>Sair da Conta</Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.error} />
          </TouchableOpacity>
        </View>

        <Text style={s.version}>ContrataJá v1.0.0</Text>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Cover + Photo
  coverSection: { position: 'relative', marginBottom: 50 },
  cover: {
    height: 140,
    backgroundColor: colors.primary,
  },
  profilePhotoWrap: {
    position: 'absolute',
    bottom: -44,
    left: spacing.xl,
  },
  profilePhoto: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surface,
    borderWidth: 4,
    borderColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  // Name section
  nameSection: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginTop: -20,
    paddingTop: spacing.xxxl + 10,
    elevation: 1,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  name: { ...typography.h1, color: colors.text },
  role: { fontSize: 15, color: colors.textSecondary, marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.xs },
  locationText: { fontSize: 13, color: colors.textMuted },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  stat: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 20, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: colors.borderLight },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionHeaderTitle: { ...typography.h3, color: colors.text },

  // Content sections
  section: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.sm,
    elevation: 1,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  sectionText: { ...typography.body, color: colors.textSecondary, lineHeight: 22 },

  // Experience / Education items
  itemCard: {
    flexDirection: 'row',
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  itemCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  itemIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
  itemSubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  itemPeriod: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  itemDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 19,
  },

  // Skills
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  skillChip: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
  },
  skillText: { fontSize: 12, color: colors.primary, fontWeight: '600' },

  // Menu
  menuSection: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuText: { flex: 1, fontSize: 15, color: colors.text, marginLeft: spacing.md },

  version: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xl,
  },
});
