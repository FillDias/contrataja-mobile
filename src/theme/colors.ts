export const colors = {
  primary: '#a1bc92',
  primaryDark: '#8aa87c',
  primaryLight: '#b5ccaa',
  primarySoft: '#e8f0e4',

  accent: '#a1bc92',
  accentLight: '#b5ccaa',
  accentSoft: '#e8f0e4',

  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',

  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#FFFFFF',

  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  divider: '#E5E7EB',

  success: '#10B981',
  successSoft: '#ECFDF5',
  error: '#EF4444',
  errorSoft: '#FEF2F2',
  warning: '#F59E0B',
  warningSoft: '#FFFBEB',
  info: '#3B82F6',
  infoSoft: '#EFF6FF',

  cardShadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',

  linkedin: {
    headerBg: '#a1bc92',
    like: '#a1bc92',
    comment: '#6B7280',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  bodySmall: { fontSize: 13, fontWeight: '400' as const },
  caption: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 0.3 },
  label: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 0.2 },
};
