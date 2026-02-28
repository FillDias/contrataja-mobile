import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Chip, IconButton, ActivityIndicator } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useAuthStore } from '../../../store/authStore';
import { ProfilePF } from '../../../types';
import useFindTalent, { WorkModeFilter, ExperienceFilter } from './useFindTalent';
import styles from './styles';

const WORK_MODE_OPTIONS: { label: string; value: WorkModeFilter }[] = [
  { label: 'Todos', value: '' },
  { label: 'Remoto', value: 'REMOTO' },
  { label: 'Presencial', value: 'PRESENCIAL' },
  { label: 'Híbrido', value: 'AMBOS' },
];

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceFilter }[] = [
  { label: 'Qualquer', value: '' },
  { label: '0–1 ano', value: '0' },
  { label: '1–3 anos', value: '1' },
  { label: '3–5 anos', value: '3' },
  { label: '5+ anos', value: '5' },
];

function TalentCard({
  profile,
  totalExp,
  onPress,
}: {
  profile: ProfilePF;
  totalExp: number;
  onPress: () => void;
}) {
  const initials = profile.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const topSkills = profile.skills.slice(0, 3);
  const mainRole = profile.experiences?.[0]?.title ?? 'Profissional';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{profile.fullName}</Text>
          <Text style={styles.cardTitle}>{mainRole}</Text>
        </View>
      </View>

      <View style={styles.badgeRow}>
        {totalExp === 0 ? (
          <View style={[styles.badge, { backgroundColor: '#EFF6FF' }]}>
            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>Jovem Talento</Text>
          </View>
        ) : (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {totalExp} {totalExp === 1 ? 'ano' : 'anos'} de exp.
            </Text>
          </View>
        )}
        {profile.workDisposition && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {profile.workDisposition === 'AMBOS' ? 'Híbrido' : profile.workDisposition === 'REMOTO' ? 'Remoto' : 'Presencial'}
            </Text>
          </View>
        )}
        {profile.resumeBoost && (
          <View style={[styles.badge, { backgroundColor: '#FFF7ED' }]}>
            <Text style={[styles.badgeText, { color: '#F97316' }]}>Destaque</Text>
          </View>
        )}
      </View>

      {topSkills.length > 0 && (
        <View style={styles.skillsRow}>
          {topSkills.map((skill) => (
            <View key={skill} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {profile.skills.length > 3 && (
            <View style={styles.skillChip}>
              <Text style={styles.skillText}>+{profile.skills.length - 3}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function FindTalent({ navigation }: any) {
  const logout = useAuthStore((s) => s.logout);

  const {
    professionals,
    isLoading,
    hasSearched,
    query,
    setQuery,
    workMode,
    setWorkMode,
    minExperience,
    setMinExperience,
    search,
    totalExperience,
  } = useFindTalent();

  const handleLogout = () => {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={styles.headerTitle}>Encontrar Talento</Text>
            <Text style={styles.headerSubtitle}>Busque profissionais por habilidade ou cargo</Text>
          </View>
          <IconButton icon="logout" size={22} onPress={handleLogout} />
        </View>

        <View style={styles.searchRow}>
          <TextInput
            mode="outlined"
            placeholder="Ex: Desenvolvedor React, Soldador..."
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            outlineStyle={{ borderRadius: 10 }}
            onSubmitEditing={search}
            returnKeyType="search"
            right={
              query.length > 0 ? (
                <TextInput.Icon icon="close" onPress={() => setQuery('')} />
              ) : undefined
            }
          />
          <IconButton
            icon="magnify"
            mode="contained"
            containerColor="#F97316"
            iconColor="#fff"
            size={24}
            onPress={search}
            style={styles.searchBtn}
          />
        </View>
      </View>

      {/* FILTROS */}
      <View style={styles.filtersSection}>
        <Text style={styles.filterLabel}>Modo de trabalho</Text>
        <View style={styles.chipRow}>
          {WORK_MODE_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              selected={workMode === opt.value}
              onPress={() => setWorkMode(opt.value)}
              style={[styles.chip, workMode === opt.value && styles.chipActive]}
              textStyle={workMode === opt.value ? styles.chipTextActive : undefined}
              compact
            >
              {opt.label}
            </Chip>
          ))}
        </View>

        <Text style={styles.filterLabel}>Experiência mínima</Text>
        <View style={styles.chipRow}>
          {EXPERIENCE_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              selected={minExperience === opt.value}
              onPress={() => setMinExperience(opt.value)}
              style={[styles.chip, minExperience === opt.value && styles.chipActive]}
              textStyle={minExperience === opt.value ? styles.chipTextActive : undefined}
              compact
            >
              {opt.label}
            </Chip>
          ))}
        </View>
      </View>

      {/* RESULTADO */}
      {isLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator color="#F97316" />
          <Text style={[styles.emptyText, { marginTop: 12 }]}>Buscando profissionais...</Text>
        </View>
      ) : (
        <>
          {hasSearched && professionals.length > 0 && (
            <Text style={styles.resultCount}>
              {professionals.length} profissional(is) encontrado(s)
            </Text>
          )}
          <FlatList
            data={professionals}
            keyExtractor={(item) => item.id}
            contentContainerStyle={
              professionals.length === 0 ? { flex: 1 } : styles.list
            }
            renderItem={({ item }) => (
              <TalentCard
                profile={item}
                totalExp={totalExperience(item)}
                onPress={() =>
                  navigation.navigate('TalentProfile', { profileId: item.id })
                }
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text variant="titleMedium" style={styles.emptyText}>
                  {hasSearched
                    ? 'Nenhum profissional encontrado'
                    : 'Use a busca acima para encontrar talentos'}
                </Text>
                {hasSearched && (
                  <Text variant="bodySmall" style={styles.emptyText}>
                    Tente termos diferentes ou remova filtros
                  </Text>
                )}
              </View>
            }
          />
        </>
      )}
    </View>
  );
}
