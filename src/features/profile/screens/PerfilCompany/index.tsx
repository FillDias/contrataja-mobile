import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Linking,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../../../../components/common/Loading';
import usePerfilCompany from './usePerfilCompany';
import styles from './styles';

export default function PerfilCompany() {
  const insets = useSafeAreaInsets();
  const { user, profile, isLoading, cnpjVisible, setCnpjVisible, maskedCnpj, handleLogout } =
    usePerfilCompany();

  if (isLoading) {
    return <Loading message="Carregando perfil..." />;
  }

  const initials = profile?.companyName
    ? profile.companyName
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'EMP';

  const planLabel: Record<string, string> = {
    BRONZE: 'Plano Bronze',
    PRATA: 'Plano Prata',
    OURO: 'Plano Ouro',
    PLATINA: 'Plano Platina',
    AVULSO: 'Plano Avulso',
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <Text style={styles.headerSubtitle}>Gerencie as informações da empresa</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.companyName}>
            {profile?.companyName ?? 'Empresa'}
          </Text>
          <Text style={styles.companyEmail}>{user?.email}</Text>
          {profile?.subscriptionPlan && (
            <View style={styles.planBadge}>
              <Text style={styles.planText}>
                {planLabel[profile.subscriptionPlan] ?? profile.subscriptionPlan}
              </Text>
            </View>
          )}
        </View>

        {/* INFORMAÇÕES DA EMPRESA */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Informações da Empresa</Text>

          {/* CNPJ */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <MaterialCommunityIcons name="card-account-details-outline" size={18} color="#64748B" />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>CNPJ</Text>
              <Text style={styles.rowValue}>
                {cnpjVisible ? (profile?.cnpj ?? '—') : maskedCnpj}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.rowAction}
              onPress={() => setCnpjVisible(!cnpjVisible)}
            >
              <MaterialCommunityIcons
                name={cnpjVisible ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>

          {/* Telefone */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <MaterialCommunityIcons name="phone-outline" size={18} color="#64748B" />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Telefone</Text>
              <Text style={styles.rowValue}>{profile?.phone ?? '—'}</Text>
            </View>
          </View>

          {/* Endereço */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <MaterialCommunityIcons name="map-marker-outline" size={18} color="#64748B" />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Endereço</Text>
              <Text style={styles.rowValue}>{profile?.address ?? '—'}</Text>
            </View>
          </View>
        </View>

        {/* CONTA */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Conta</Text>

          {/* Termos de Uso */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('https://contrataja.com.br/termos')}
            activeOpacity={0.7}
          >
            <View style={styles.rowIcon}>
              <MaterialCommunityIcons name="file-document-outline" size={18} color="#64748B" />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowValue}>Termos de Uso</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Sair */}
          <TouchableOpacity style={styles.logoutRow} onPress={handleLogout} activeOpacity={0.7}>
            <View style={styles.logoutIcon}>
              <MaterialCommunityIcons name="logout" size={18} color="#EF4444" />
            </View>
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
