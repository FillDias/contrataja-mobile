import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { colors, spacing, radius, typography } from '../../theme/colors';





interface ButtonProps {
  label: string;
  onPress: () => void;
  mode?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  label,
  onPress,
  mode = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const getPaperMode = () => {
    if (mode === 'primary') return 'contained';
    if (mode === 'secondary') return 'outlined';
    return 'text';
  };

  return (
    <PaperButton
      mode={getPaperMode()}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={[
        styles.button,
        mode === 'primary' && styles.primary,
        mode === 'secondary' && styles.secondary,
        style,
      ]}
      contentStyle={styles.content}
      labelStyle={[
        styles.label,
        mode === 'primary' && styles.primaryLabel,
        mode === 'secondary' && styles.secondaryLabel,
        mode === 'ghost' && styles.ghostLabel,
      ]}
    >
      {label}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.lg,
    marginVertical: spacing.sm,
  },

  content: {
    paddingVertical: spacing.md,
  },

  label: {
    ...typography.label,
  },

  primary: {
    backgroundColor: colors.accent,
    elevation: 2,
  },

  primaryLabel: {
    color: colors.textOnAccent,
  },

  secondary: {
    borderColor: colors.accent,
    borderWidth: 1,
    backgroundColor: colors.surface,
  },

  secondaryLabel: {
    color: colors.accent,
  },

  ghostLabel: {
    color: colors.accent,
  },
});
