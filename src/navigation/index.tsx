import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ActivityIndicator, View } from 'react-native'
import { useAuthStore } from '../store/authStore'

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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomePF"
        component={HomePF}
        options={{ tabBarLabel: 'Vagas', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="RequestService"
        component={RequestService}
        options={{ tabBarLabel: 'Servicos', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="NotificationsPF"
        component={Notifications}
        options={{ tabBarLabel: 'Alertas', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="ProfilePF"
        component={ProfilePF}
        options={{ tabBarLabel: 'Perfil', tabBarIcon: () => null }}
      />
    </Tab.Navigator>
  )
}

// ==================== COMPANY TABS ====================

function CompanyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeCompany"
        component={HomeCompany}
        options={{ tabBarLabel: 'Vagas', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="CreateJobCall"
        component={CreateJobCall}
        options={{ tabBarLabel: 'Nova vaga', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="NotificationsCompany"
        component={Notifications}
        options={{ tabBarLabel: 'Alertas', tabBarIcon: () => null }}
      />
    </Tab.Navigator>
  )
}

// ==================== PROVIDER TABS ====================

function ProviderTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeProvider"
        component={HomeProvider}
        options={{ tabBarLabel: 'Servicos', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="NotificationsProvider"
        component={Notifications}
        options={{ tabBarLabel: 'Alertas', tabBarIcon: () => null }}
      />
    </Tab.Navigator>
  )
}

// ==================== INSTITUTION TABS ====================

function InstitutionTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeInstitution"
        component={Notifications}
        options={{ tabBarLabel: 'Cursos', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="NotificationsInstitution"
        component={Notifications}
        options={{ tabBarLabel: 'Alertas', tabBarIcon: () => null }}
      />
    </Tab.Navigator>
  )
}

// ==================== STACKS COM TABS + TELAS INTERNAS ====================

function PFStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PFTabs" component={PFTabs} options={{ headerShown: false }} />
      <Stack.Screen name="JobCallDetail" component={JobCallDetail} options={{ title: 'Detalhes da vaga' }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }: any) => ({ title: route.params?.otherUserName ?? 'Chat' })} />
    </Stack.Navigator>
  )
}

function CompanyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CompanyTabs" component={CompanyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="JobCallStatus" component={JobCallDetail} options={{ title: 'Status da vaga' }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }: any) => ({ title: route.params?.otherUserName ?? 'Chat' })} />
    </Stack.Navigator>
  )
}

function ProviderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProviderTabs" component={ProviderTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }: any) => ({ title: route.params?.otherUserName ?? 'Chat' })} />
    </Stack.Navigator>
  )
}

function InstitutionStack() {
  return (
    <Stack.Navigator>
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
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
