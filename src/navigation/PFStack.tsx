import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotificationStore } from '../features/notifications/store/notificationStore';
import { colors } from '../theme/colors';
import FeedScreen from '../features/feed/screens/FeedScreen';
import ServicosScreen from '../features/services-marketplace/screens/ServicosScreen';
import VagasScreen from '../features/jobs/screens/VagasScreen';
import AlertasScreen from '../features/notifications/screens/AlertasScreen';
import PerfilScreen from '../features/profile/screens/PerfilScreen';
import JobCallDetail from '../features/jobs/screens/JobCallDetail';
import ResumeScreen from '../features/resume/screens/ResumeScreen';
import Chat from '../features/chat/screens/Chat';
import ProfilePFScreen from '../features/profile/screens/ProfilePF';
import TermosUsoScreen from '../features/legal/screens/TermosUsoScreen';
import PrivacidadeScreen from '../features/legal/screens/PrivacidadeScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  headerTitleStyle: { fontWeight: '600' as const, fontSize: 17 },
};
function PFTabs() {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 8);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.textMuted, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, elevation: 0, height: 52 + bottomPad, paddingBottom: bottomPad, paddingTop: 4 }, tabBarLabelStyle: { fontSize: 11, fontWeight: '600' as const } }}>
      <Tab.Screen name="FeedPF" component={FeedScreen} options={{ tabBarLabel: 'Feed', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="newspaper-variant-outline" size={size} color={color} /> }} />
      <Tab.Screen name="ServicosPF" component={ServicosScreen} options={{ tabBarLabel: 'Servicos', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="wrench-outline" size={size} color={color} /> }} />
      <Tab.Screen name="VagasPF" component={VagasScreen} options={{ tabBarLabel: 'Vagas', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="briefcase-outline" size={size} color={color} /> }} />
      <Tab.Screen name="AlertasPF" component={AlertasScreen} options={{ tabBarLabel: 'Alertas', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bell-outline" size={size} color={color} />, tabBarBadge: unreadCount > 0 ? (unreadCount > 99 ? '99+' : unreadCount) : undefined, tabBarBadgeStyle: { backgroundColor: colors.accent, fontSize: 10, minWidth: 18 } }} />
      <Tab.Screen name="PerfilPF" component={PerfilScreen} options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}
export default function PFStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="PFTabs" component={PFTabs} options={{ headerShown: false }} />
      <Stack.Screen name="JobCallDetail" component={JobCallDetail} options={{ title: 'Detalhes da vaga' }} />
      <Stack.Screen name="Resume" component={ResumeScreen} options={{ title: 'Meu Curriculo' }} />
      <Stack.Screen name="ProfilePF" component={ProfilePFScreen} options={{ title: 'Editar Perfil' }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }: any) => ({ title: route.params?.otherUserName ?? 'Chat' })} />
      <Stack.Screen name="TermosUso" component={TermosUsoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Privacidade" component={PrivacidadeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
