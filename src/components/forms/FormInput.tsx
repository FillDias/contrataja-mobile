import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Controller, Control } from 'react-hook-form';

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  rules?: any;
}

export default function FormInput({
  name,
  control,
  label,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  multiline,
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            error={!!error}
            mode="outlined"
            style={styles.input}
          />
          {error && (
            <HelperText type="error" visible>
              {error.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 4,
    backgroundColor: '#fff',
  },
});
