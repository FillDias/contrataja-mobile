import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { profilesApi } from '../../../services/api/profilesApi';
import { ProfilePF } from '../../../types';
import { colors } from '../../../theme/colors';
import styles from './styles';

const workModeLabel: Record<string, string> = {
  REMOTO: 'Remoto',
  PRESENCIAL: 'Presencial',
  AMBOS: 'Híbrido',
};

export default function TalentProfile({ route }: any) {
  const { profileId } = route.params as { profileId: string };
  const [profile, setProfile] = useState<ProfilePF | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await profilesApi.getProfilePFById(profileId);
        setProfile(data);
      } catch {
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [profileId]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Text style={{ color: colors.textMuted }}>Perfil não encontrado</Text>
      </View>
    );
  }

  const initials = profile.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const totalExp = profile.experiences?.reduce((s, e) => s + e.years, 0) ?? 0;
  const mainRole = profile.experiences?.[0]?.title ?? 'Profissional';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* HERO */}
      <View style={styles.heroCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.mainRole}>{mainRole}</Text>

        <View style={styles.badgeRow}>
          {totalExp === 0 ? (
            <View style={[styles.badge, { backgroundColor: '#EFF6FF' }]}>
              <Text style={[styles.badgeText, { color: '#3B82F6' }]}>Jovem Talento</Text>
            </View>
          ) : (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalExp} {totalExp === 1 ? 'ano' : 'anos'} de exp.</Text>
            </View>
          )}
          {profile.workDisposition && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{workModeLabel[profile.workDisposition] ?? profile.workDisposition}</Text>
            </View>
          )}
          {profile.driverLicense && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>CNH</Text>
            </View>
          )}
          {profile.resumeBoost && (
            <View style={[styles.badge, { backgroundColor: '#FFF7ED' }]}>
              <Text style={[styles.badgeText, { color: '#F97316' }]}>Destaque</Text>
            </View>
          )}
        </View>
      </View>

      {/* CONTATO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <View style={styles.contactRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.contactText}>{profile.address || 'Não informado'}</Text>
        </View>
        <View style={styles.contactRow}>
          <MaterialCommunityIcons name="phone-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.contactText}>{profile.phone}</Text>
        </View>
      </View>

      {/* RESUMO */}
      {profile.qualificationsSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo profissional</Text>
          <Text style={styles.summaryText}>{profile.qualificationsSummary}</Text>
        </View>
      )}

      {/* SKILLS */}
      {profile.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.skillsRow}>
            {profile.skills.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* EXPERIÊNCIAS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiências</Text>
        {profile.experiences?.length > 0 ? (
          profile.experiences.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <Text style={styles.expTitle}>{exp.title}</Text>
              <Text style={styles.expCompany}>{exp.company}</Text>
              <Text style={styles.expYears}>{exp.years} {exp.years === 1 ? 'ano' : 'anos'}</Text>
              {exp.description && (
                <Text style={[styles.expCompany, { marginTop: 4 }]}>{exp.description}</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhuma experiência informada</Text>
        )}
      </View>

      {/* EDUCAÇÃO */}
      {profile.educations && profile.educations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação acadêmica</Text>
          {profile.educations.map((edu) => (
            <View key={edu.id} style={styles.eduItem}>
              <Text style={styles.eduDegree}>{edu.degree} em {edu.field}</Text>
              <Text style={styles.eduInstitution}>{edu.institution}</Text>
              {(edu.startYear || edu.endYear) && (
                <Text style={styles.expYears}>
                  {edu.startYear ?? '?'} – {edu.endYear ?? 'Atual'}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
