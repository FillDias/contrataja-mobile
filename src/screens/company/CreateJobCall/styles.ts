import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../../theme/colors';

export default StyleSheet.create({
  scroll: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: -4,
    marginBottom: spacing.sm,
  },
  submitBtn: {
    marginTop: spacing.xxl,
    marginBottom: 40,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
  },
});
