// ==================== ENUMS ====================

export enum UserType {
  PF = 'PF',
  PJ_CONTRATANTE = 'PJ_CONTRATANTE',
  PJ_PRESTADOR = 'PJ_PRESTADOR',
  INSTITUICAO = 'INSTITUICAO',
}

export enum Gender {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  OUTRO = 'OUTRO',
}

export enum JobCallStatus {
  OPEN = 'OPEN',
  MATCHING = 'MATCHING',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum JobMatchStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum ServiceCallStatus {
  OPEN = 'OPEN',
  MATCHED = 'MATCHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum SubscriptionPlan {
  BRONZE = 'BRONZE',
  PRATA = 'PRATA',
  OURO = 'OURO',
  PLATINA = 'PLATINA',
  AVULSO = 'AVULSO',
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

// ==================== MODELS ====================

export interface User {
  id: string;
  email: string;
  type: UserType;
  createdAt: string;
  updatedAt: string;
  profilePF?: ProfilePF;
  profileCompany?: ProfileCompany;
  profileServiceProvider?: ProfileServiceProvider;
  profileInstitution?: ProfileInstitution;
}

export interface Experience {
  id: string;
  profileId: string;
  title: string;
  company: string;
  years: number;
  description?: string;
  createdAt: string;
}

export interface ProfilePF {
  id: string;
  userId: string;
  fullName: string;
  cpf: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  address: string;
  lat: number;
  lng: number;
  driverLicense: boolean;
  resumeBoost: boolean;
  skills: string[];
  experiences: Experience[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileCompany {
  id: string;
  userId: string;
  companyName: string;
  cnpj: string;
  phone: string;
  address: string;
  lat: number;
  lng: number;
  subscriptionPlan: SubscriptionPlan;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileServiceProvider {
  id: string;
  userId: string;
  companyName: string;
  cnpj: string;
  phone: string;
  serviceCategories: string[];
  address: string;
  lat: number;
  lng: number;
  rating: number;
  totalRatings: number;
  distance?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileInstitution {
  id: string;
  userId: string;
  institutionName: string;
  cnpj: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobRequirements {
  gender?: Gender;
  minAge?: number;
  maxAge?: number;
  minExperience?: number;
  maxDistance?: number;
  driverLicense?: boolean;
  requiredSkills: string[];
}

export interface JobCall {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: JobRequirements;
  status: JobCallStatus;
  company?: ProfileCompany;
  matches?: JobMatch[];
  createdAt: string;
  updatedAt: string;
}

export interface JobMatch {
  id: string;
  jobCallId: string;
  candidateId: string;
  score: number;
  isYoungTalent: boolean;
  status: JobMatchStatus;
  jobCall?: JobCall;
  candidate?: User;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCall {
  id: string;
  requesterId: string;
  providerId?: string;
  serviceType: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  status: ServiceCallStatus;
  budget?: number;
  rating?: number;
  requester?: User;
  provider?: ProfileServiceProvider;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  institutionId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  duration: string;
  institution?: ProfileInstitution;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  roomId: string;
  content: string;
  type: MessageType;
  sender?: { id: string; email: string };
  createdAt: string;
}

export interface ChatRoom {
  roomId: string;
  lastMessage: string;
  lastMessageAt: string;
  otherUser: { id: string; email: string };
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

// ==================== AUTH ====================

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    type: UserType;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  type: UserType;
}

export interface LoginData {
  email: string;
  password: string;
}

// ==================== NAVIGATION ====================

export type AuthStackParamList = {
  UserType: undefined;
  Login: { userType: UserType };
  Register: { userType: UserType };
};

export type PFTabParamList = {
  HomePF: undefined;
  RequestService: undefined;
  Notifications: undefined;
  ProfilePF: undefined;
};

export type CompanyTabParamList = {
  HomeCompany: undefined;
  CreateJobCall: undefined;
  Notifications: undefined;
  ProfileCompany: undefined;
};

export type ProviderTabParamList = {
  HomeProvider: undefined;
  Notifications: undefined;
  ProfileProvider: undefined;
};

export type InstitutionTabParamList = {
  HomeInstitution: undefined;
  Notifications: undefined;
  ProfileInstitution: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  PFTabs: undefined;
  CompanyTabs: undefined;
  ProviderTabs: undefined;
  InstitutionTabs: undefined;
  JobCallDetail: { jobCallId: string; matchId: string };
  ServiceDetail: { serviceCallId: string };
  Chat: { roomId: string; otherUserId: string; otherUserName: string };
  JobCallStatus: { jobCallId: string };
};
