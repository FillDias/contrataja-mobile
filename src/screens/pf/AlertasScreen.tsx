import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../theme/colors';

type NotifType = 'proposta' | 'servico' | 'sistema' | 'vaga';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  actionable?: boolean;
  company?: string;
  salary?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'proposta',
    title: 'Proposta de Emprego',
    message: 'A TechSoft Soluções te enviou uma proposta para a vaga de Desenvolvedor React Native.',
    time: '10:30',
    date: 'Hoje',
    read: false,
    actionable: true,
    company: 'TechSoft Soluções',
    salary: 'R$ 7.500/mês',
  },
  {
    id: '2',
    type: 'proposta',
    title: 'Proposta de Emprego',
    message: 'A Indústria Metalúrgica ABC quer te entrevistar para Eletricista Industrial.',
    time: '09:15',
    date: 'Hoje',
    read: false,
    actionable: true,
    company: 'Indústria Metalúrgica ABC',
    salary: 'R$ 4.200/mês',
  },
  {
    id: '3',
    type: 'servico',
    title: 'Solicitação de Serviço',
    message: 'Maria Silva solicitou um orçamento para serviço de elétrica residencial na zona sul de SP.',
    time: '08:00',
    date: 'Hoje',
    read: true,
  },
  {
    id: '4',
    type: 'vaga',
    title: 'Vaga Compatível',
    message: 'Nova vaga de Designer Gráfico na Agência Criativa MKT combina com seu perfil.',
    time: '18:45',
    date: 'Ontem',
    read: true,
  },
  {
    id: '5',
    type: 'sistema',
    title: 'Complete seu Perfil',
    message: 'Adicione suas experiências e formação para aumentar suas chances de ser encontrado.',
    time: '14:00',
    date: 'Ontem',
    read: true,
  },
  {
    id: '6',
    type: 'servico',
    title: 'Serviço Aceito',
    message: 'Roberto Almeida aceitou seu pedido de orçamento para instalação elétrica.',
    time: '10:20',
    date: '12/02/2026',
    read: true,
  },
  {
    id: '7',
    type: 'proposta',
    title: 'Proposta de Emprego',
    message: 'Logística Express te convidou para entrevista para Motorista de Entregas.',
    time: '16:30',
    date: '11/02/2026',
    read: true,
    actionable: true,
    company: 'Logística Express',
    salary: 'R$ 3.200/mês',
  },
];

const typeConfig: Record<NotifType, { icon: string; color: string; bg: string }> = {
  proposta: { icon: 'briefcase-check', color: colors.primary, bg: colors.primarySoft },
  servico: { icon: 'wrench', color: colors.info, bg: colors.infoSoft },
  vaga: { icon: 'briefcase-search', color: colors.warning, bg: colors.warningSoft },
  sistema: { icon: 'information', color: colors.textSecondary, bg: colors.surfaceVariant },
};

export default function AlertasScreen() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const grouped = notifications.reduce<Record<string, Notification[]>>((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  const handleAccept = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true, actionable: false } : n)),
    );
  };

  const handleReject = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.headerTitle}>Alertas</Text>
          {unreadCount > 0 && (
            <Text style={s.headerSubtitle}>{unreadCount} não lidas</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          >
            <Text style={s.markAllRead}>Marcar todas como lidas</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        {Object.entries(grouped).map(([date, items]) => (
          <View key={date}>
            <Text style={s.dateHeader}>{date}</Text>

            {items.map(notif => {
              const config = typeConfig[notif.type];
              return (
                <TouchableOpacity
                  key={notif.id}
                  style={[s.notifCard, !notif.read && s.notifCardUnread]}
                  onPress={() => handleMarkRead(notif.id)}
                >
                  {/* Unread indicator */}
                  {!notif.read && <View style={s.unreadDot} />}

                  <View style={[s.notifIcon, { backgroundColor: config.bg }]}>
                    <MaterialCommunityIcons
                      name={config.icon as any}
                      size={22}
                      color={config.color}
                    />
                  </View>

                  <View style={s.notifBody}>
                    <View style={s.notifHeaderRow}>
                      <Text style={[s.notifTitle, !notif.read && s.notifTitleUnread]}>
                        {notif.title}
                      </Text>
                      <Text style={s.notifTime}>{notif.time}</Text>
                    </View>
                    <Text style={s.notifMessage}>{notif.message}</Text>

                    {/* Proposta highlight */}
                    {notif.type === 'proposta' && notif.company && (
                      <View style={s.propostaHighlight}>
                        <View style={s.propostaRow}>
                          <MaterialCommunityIcons name="domain" size={14} color={colors.primary} />
                          <Text style={s.propostaCompany}>{notif.company}</Text>
                        </View>
                        {notif.salary && (
                          <View style={s.propostaRow}>
                            <MaterialCommunityIcons name="cash" size={14} color={colors.success} />
                            <Text style={s.propostaSalary}>{notif.salary}</Text>
                          </View>
                        )}
                      </View>
                    )}

                    {/* Action buttons for proposals */}
                    {notif.actionable && (
                      <View style={s.actionBtns}>
                        <TouchableOpacity
                          style={s.acceptBtn}
                          onPress={() => handleAccept(notif.id)}
                        >
                          <MaterialCommunityIcons name="check" size={16} color="#FFF" />
                          <Text style={s.acceptBtnText}>Aceitar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={s.rejectBtn}
                          onPress={() => handleReject(notif.id)}
                        >
                          <MaterialCommunityIcons name="close" size={16} color={colors.error} />
                          <Text style={s.rejectBtnText}>Recusar</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFF', letterSpacing: -0.3 },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  markAllRead: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },

  list: { flex: 1 },

  dateHeader: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },

  notifCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    padding: spacing.lg,
    elevation: 1,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  notifCardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  unreadDot: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  notifIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  notifBody: { flex: 1 },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifTitle: { fontSize: 14, fontWeight: '500', color: colors.text },
  notifTitleUnread: { fontWeight: '700' },
  notifTime: { fontSize: 11, color: colors.textMuted },
  notifMessage: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 19,
  },

  propostaHighlight: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    gap: 6,
  },
  propostaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  propostaCompany: { fontSize: 13, fontWeight: '600', color: colors.text },
  propostaSalary: { fontSize: 13, fontWeight: '700', color: colors.success },

  actionBtns: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  acceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: 4,
  },
  acceptBtnText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  rejectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorSoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: 4,
  },
  rejectBtnText: { color: colors.error, fontWeight: '600', fontSize: 13 },
});
