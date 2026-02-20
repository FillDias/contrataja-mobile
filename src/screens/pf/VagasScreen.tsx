import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../theme/colors';

type FilterType = 'Todos' | 'Integral' | 'Meio Período' | 'Remoto' | 'Presencial';

const FILTERS: FilterType[] = ['Todos', 'Integral', 'Meio Período', 'Remoto', 'Presencial'];

const MOCK_VAGAS = [
  {
    id: '1',
    title: 'Desenvolvedor React Native',
    company: 'TechSoft Soluções',
    city: 'São Paulo, SP',
    type: 'Remoto',
    period: 'Integral',
    salary: 'R$ 6.000 - R$ 9.000',
    posted: '2h atrás',
    description:
      'Estamos buscando um desenvolvedor React Native com experiência em projetos mobile. Conhecimento em TypeScript, Redux e APIs REST é desejável. Trabalho 100% remoto com horário flexível.',
    requirements: [
      'Experiência com React Native (mínimo 2 anos)',
      'Conhecimento em TypeScript',
      'Experiência com APIs REST',
      'Git e metodologias ágeis',
    ],
    benefits: ['Vale refeição', 'Plano de saúde', 'Home office', 'Horário flexível'],
  },
  {
    id: '2',
    title: 'Eletricista Industrial',
    company: 'Indústria Metalúrgica ABC',
    city: 'Guarulhos, SP',
    type: 'Presencial',
    period: 'Integral',
    salary: 'R$ 3.500 - R$ 4.800',
    posted: '5h atrás',
    description:
      'Vaga para eletricista industrial com experiência em manutenção preventiva e corretiva de equipamentos industriais. NR-10 atualizado é obrigatório.',
    requirements: [
      'NR-10 atualizado',
      'Experiência em manutenção industrial',
      'Leitura de diagramas elétricos',
      'Disponibilidade para turnos',
    ],
    benefits: ['Vale transporte', 'Vale alimentação', 'Plano de saúde', 'PLR'],
  },
  {
    id: '3',
    title: 'Atendente de Loja',
    company: 'Magazine Central',
    city: 'Campinas, SP',
    type: 'Presencial',
    period: 'Meio Período',
    salary: 'R$ 1.800 - R$ 2.200',
    posted: '1d atrás',
    description:
      'Procuramos atendente com boa comunicação para atuar em nossa loja no Shopping Campinas. Horário: 13h às 19h de segunda a sábado.',
    requirements: [
      'Ensino médio completo',
      'Boa comunicação',
      'Experiência com atendimento ao público',
      'Disponibilidade para trabalhar aos sábados',
    ],
    benefits: ['Vale transporte', 'Comissão sobre vendas', 'Desconto em produtos'],
  },
  {
    id: '4',
    title: 'Designer Gráfico Freelancer',
    company: 'Agência Criativa MKT',
    city: 'Rio de Janeiro, RJ',
    type: 'Remoto',
    period: 'Meio Período',
    salary: 'R$ 3.000 - R$ 5.000',
    posted: '1d atrás',
    description:
      'Buscamos designer gráfico para projetos sob demanda. Conhecimento em Figma, Photoshop e Illustrator. Portfolio atualizado é obrigatório.',
    requirements: [
      'Domínio de Figma e Adobe Creative Suite',
      'Portfolio com trabalhos recentes',
      'Experiência com identidade visual',
      'Boa gestão de prazos',
    ],
    benefits: ['Horário flexível', 'Projetos variados', 'Possibilidade de efetivação'],
  },
  {
    id: '5',
    title: 'Motorista de Entregas',
    company: 'Logística Express',
    city: 'São Paulo, SP',
    type: 'Presencial',
    period: 'Integral',
    salary: 'R$ 2.800 - R$ 3.500',
    posted: '3d atrás',
    description:
      'Vaga para motorista de entregas na região metropolitana de São Paulo. CNH categoria B. Veículo da empresa.',
    requirements: [
      'CNH categoria B',
      'Conhecimento da região de SP',
      'Boa organização',
      'Sem restrições no prontuário',
    ],
    benefits: ['Vale refeição', 'Vale transporte', 'Seguro de vida'],
  },
];

export default function VagasScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');
  const [selectedVaga, setSelectedVaga] = useState<(typeof MOCK_VAGAS)[0] | null>(null);

  const filtered = MOCK_VAGAS.filter(v => {
    const matchSearch =
      !search ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.company.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === 'Todos' ||
      v.type === activeFilter ||
      v.period === activeFilter;
    return matchSearch && matchFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remoto': return { bg: colors.infoSoft, text: colors.info };
      case 'Presencial': return { bg: colors.warningSoft, text: colors.warning };
      default: return { bg: colors.accentSoft, text: colors.accent };
    }
  };

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Vagas</Text>
        <Text style={s.headerSubtitle}>{filtered.length} vagas encontradas</Text>
      </View>

      {/* Search */}
      <View style={s.searchContainer}>
        <View style={s.searchWrap}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />
          <TextInput
            style={s.searchInput}
            placeholder="Cargo, empresa ou cidade..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <MaterialCommunityIcons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={s.filtersScroll}
          contentContainerStyle={s.filtersContent}
        >
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[s.filterChip, activeFilter === f && s.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[s.filterText, activeFilter === f && s.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vagas List */}
      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={s.emptyContainer}>
            <MaterialCommunityIcons name="briefcase-search" size={48} color={colors.textMuted} />
            <Text style={s.emptyText}>Nenhuma vaga encontrada</Text>
            <Text style={s.emptyHint}>Tente ajustar seus filtros</Text>
          </View>
        ) : (
          filtered.map(vaga => {
            const typeColor = getTypeColor(vaga.type);
            return (
              <TouchableOpacity
                key={vaga.id}
                style={s.vagaCard}
                onPress={() => setSelectedVaga(vaga)}
              >
                <View style={s.vagaHeader}>
                  <View style={s.companyIcon}>
                    <MaterialCommunityIcons name="domain" size={22} color={colors.accent} />
                  </View>
                  <View style={s.vagaInfo}>
                    <Text style={s.vagaTitle}>{vaga.title}</Text>
                    <Text style={s.vagaCompany}>{vaga.company}</Text>
                  </View>
                </View>

                <View style={s.vagaDetails}>
                  <View style={s.detailRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.textMuted} />
                    <Text style={s.detailText}>{vaga.city}</Text>
                  </View>
                  <View style={s.detailRow}>
                    <MaterialCommunityIcons name="cash" size={14} color={colors.textMuted} />
                    <Text style={s.detailText}>{vaga.salary}</Text>
                  </View>
                </View>

                <View style={s.vagaTags}>
                  <View style={[s.typeTag, { backgroundColor: typeColor.bg }]}>
                    <Text style={[s.typeTagText, { color: typeColor.text }]}>{vaga.type}</Text>
                  </View>
                  <View style={s.periodTag}>
                    <Text style={s.periodTagText}>{vaga.period}</Text>
                  </View>
                  <Text style={s.postedText}>{vaga.posted}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selectedVaga} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Detalhes da Vaga</Text>
              <TouchableOpacity onPress={() => setSelectedVaga(null)}>
                <MaterialCommunityIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {selectedVaga && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={s.modalVagaTitle}>{selectedVaga.title}</Text>
                <Text style={s.modalCompany}>{selectedVaga.company}</Text>

                <View style={s.modalInfoRow}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={colors.accent} />
                  <Text style={s.modalInfoText}>{selectedVaga.city}</Text>
                </View>
                <View style={s.modalInfoRow}>
                  <MaterialCommunityIcons name="cash" size={16} color={colors.accent} />
                  <Text style={s.modalInfoText}>{selectedVaga.salary}</Text>
                </View>
                <View style={s.modalInfoRow}>
                  <MaterialCommunityIcons name="clock-outline" size={16} color={colors.accent} />
                  <Text style={s.modalInfoText}>
                    {selectedVaga.period} · {selectedVaga.type}
                  </Text>
                </View>

                <Text style={s.modalSectionTitle}>Descrição</Text>
                <Text style={s.modalDescription}>{selectedVaga.description}</Text>

                <Text style={s.modalSectionTitle}>Requisitos</Text>
                {selectedVaga.requirements.map((req, i) => (
                  <View key={i} style={s.bulletRow}>
                    <Text style={s.bullet}>•</Text>
                    <Text style={s.bulletText}>{req}</Text>
                  </View>
                ))}

                <Text style={s.modalSectionTitle}>Benefícios</Text>
                <View style={s.benefitsWrap}>
                  {selectedVaga.benefits.map((b, i) => (
                    <View key={i} style={s.benefitChip}>
                      <Text style={s.benefitText}>{b}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={s.applyBtn}>
                  <Text style={s.applyBtnText}>Candidatar-se</Text>
                </TouchableOpacity>

                <View style={{ height: 30 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 48,
    paddingBottom: 14,
    paddingHorizontal: spacing.xl,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFF', letterSpacing: -0.3 },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  searchContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 42,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, ...typography.body, color: colors.text },
  filtersScroll: { marginTop: spacing.md },
  filtersContent: { gap: spacing.sm, paddingBottom: spacing.xs },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: { fontSize: 13, fontWeight: '500', color: colors.textSecondary },
  filterTextActive: { color: '#FFF', fontWeight: '600' },

  list: { flex: 1, paddingHorizontal: spacing.md, paddingTop: spacing.md },

  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
  emptyHint: { ...typography.bodySmall, color: colors.textMuted, marginTop: 4 },

  vagaCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    elevation: 1,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  vagaHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  companyIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vagaInfo: { flex: 1, marginLeft: spacing.md },
  vagaTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  vagaCompany: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  vagaDetails: { marginTop: spacing.md, gap: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 13, color: colors.textMuted },
  vagaTags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  typeTag: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  typeTagText: { fontSize: 11, fontWeight: '600' },
  periodTag: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
  },
  periodTagText: { fontSize: 11, fontWeight: '600', color: colors.accent },
  postedText: { fontSize: 11, color: colors.textMuted, marginLeft: 'auto' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '85%',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: { ...typography.h3, color: colors.text },
  modalVagaTitle: { ...typography.h2, color: colors.text },
  modalCompany: { fontSize: 15, color: colors.textSecondary, marginTop: 4 },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  modalInfoText: { fontSize: 14, color: colors.text },
  modalSectionTitle: {
    ...typography.label,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  modalDescription: { ...typography.body, color: colors.textSecondary, lineHeight: 22 },
  bulletRow: { flexDirection: 'row', marginBottom: 6, paddingRight: spacing.lg },
  bullet: { color: colors.accent, fontSize: 16, marginRight: spacing.sm, lineHeight: 22 },
  bulletText: { ...typography.body, color: colors.textSecondary, flex: 1 },
  benefitsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  benefitChip: {
    backgroundColor: colors.successSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  benefitText: { fontSize: 12, color: colors.success, fontWeight: '600' },
  applyBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  applyBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
