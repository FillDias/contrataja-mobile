import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ActivityIndicator, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuthStore } from '../store/authStore'
import { colors } from '../theme/colors'

// Auth
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import UserTypeScreen from '../screens/auth/UserTypeScreen'

// PF
import HomePF from '../screens/pf/HomePF'
import JobCallDetail from '../screens/pf/JobCallDetail'
import RequestService from '../screens/pf/RequestService'
import ProfilePF from '../screens/pf/ProfilePF'

// Company
import HomeCompany from '../screens/company/HomeCompany'
import CreateJobCall from '../screens/company/CreateJobCall'

// Provider
import HomeProvider from '../screens/provider/HomeProvider'

// Common
import Chat from '../screens/common/Chat'
import Notifications from '../screens/common/Notifications'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarStyle: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    elevation: 0,
    height: 60,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '600' as const,
  },
}

const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  headerTitleStyle: { fontWeight: '600' as const, fontSize: 17 },
}

// ==================== AUTH ====================

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserType" component={UserTypeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

// ==================== PF TABS ====================

function PFTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomePF"
        component={HomePF}
        options={{
          tabBarLabel: 'Vagas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RequestService"
        component={RequestService}
        options={{
          tabBarLabel: 'Servicos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wrench-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsPF"
        component={Notifications}
        options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePF"
        component={ProfilePF}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// ==================== COMPANY TABS ====================

function CompanyTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeCompany"
        component={HomeCompany}
        options={{
          tabBarLabel: 'Vagas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateJobCall"
        component={CreateJobCall}
        options={{
          tabBarLabel: 'Nova vaga',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsCompany"
        component={Notifications}
        options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// ==================== PROVIDER TABS ====================

function ProviderTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeProvider"
        component={HomeProvider}
        options={{
          tabBarLabel: 'Servicos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wrench-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsProvider"
        component={Notifications}
        options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// ==================== INSTITUTION TABS ====================

function InstitutionTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeInstitution"
        component={Notifications}
        options={{
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsInstitution"
        component={Notifications}
        options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// ==================== STACKS COM TABS + TELAS INTERNAS ====================

function PFStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="PFTabs" component={PFTabs} options={{ headerShown: false }} />
      <Stack.Screen name="JobCallDetail" component={JobCallDetail} options={{ title: 'Detalhes da vaga' }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }: any) => ({ title: route.params?.otherUserName ?? 'Chat' })} />
    </Stack.Navigator>
  )
}

function CompanyStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="CompanyTabs" component={CompanyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="JobCallStatus" component={JobCallDetail} options={{ title: 'Status da vaga' }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }: any) => ({ title: route.params?.otherUserName ?? 'Chat' })} />
    </Stack.Navigator>
  )
}

function ProviderStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="ProviderTabs" component={ProviderTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }: any) => ({ title: route.params?.otherUserName ?? 'Chat' })} />
    </Stack.Navigator>
  )
}

function InstitutionStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="InstitutionTabs" component={InstitutionTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

// ==================== ROOT ====================

export default function RootNavigation() {
  const { user, isAuthenticated, isLoading, loadStoredAuth } = useAuthStore()

  React.useEffect(() => {
    loadStoredAuth()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStack />
      ) : user?.type === 'PF' ? (
        <PFStack />
      ) : user?.type === 'PJ_CONTRATANTE' ? (
        <CompanyStack />
      ) : user?.type === 'PJ_PRESTADOR' ? (
        <ProviderStack />
      ) : (
        <InstitutionStack />
      )}
    </NavigationContainer>
  )
}
