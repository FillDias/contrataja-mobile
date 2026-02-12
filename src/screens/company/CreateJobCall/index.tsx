import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../../components/forms/FormInput';
import useCreateJobCall from './useCreateJobCall';
import styles from './styles';

const jobCallSchema = z.object({
  title: z.string().min(3, 'Titulo obrigatorio'),
  description: z.string().min(10, 'Descricao obrigatoria (min 10 caracteres)'),
  skills: z.string().optional(),
  minExperience: z.string().optional(),
  maxDistance: z.string().optional(),
  driverLicense: z.string().optional(),
  gender: z.string().optional(),
  minAge: z.string().optional(),
  maxAge: z.string().optional(),
});

type JobCallForm = z.infer<typeof jobCallSchema>;

export default function CreateJobCall({ navigation }: any) {
  const { handleSubmit: onSubmitJob, isLoading } = useCreateJobCall(navigation);

  const { control, handleSubmit } = useForm<JobCallForm>({
    resolver: zodResolver(jobCallSchema),
    defaultValues: {
      title: '',
      description: '',
      skills: '',
      minExperience: '',
      maxDistance: '',
      driverLicense: '',
      gender: '',
      minAge: '',
      maxAge: '',
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text variant="titleLarge" style={styles.title}>
        Criar nova vaga
      </Text>

      <FormInput name="title" control={control} label="Titulo da vaga" />
      <FormInput
        name="description"
        control={control}
        label="Descricao"
        multiline
      />

      <Text variant="titleSmall" style={[styles.sectionTitle, styles.section]}>
        Requisitos (opcional)
      </Text>

      <FormInput
        name="skills"
        control={control}
        label="Competencias obrigatorias"
        placeholder="Separadas por virgula: soldagem, NR10..."
      />
      <Text style={styles.hint}>Separe cada competencia por virgula</Text>

      <FormInput
        name="minExperience"
        control={control}
        label="Experiencia minima (anos)"
        keyboardType="numeric"
      />
      <FormInput
        name="maxDistance"
        control={control}
        label="Distancia maxima (km)"
        keyboardType="numeric"
      />
      <FormInput
        name="gender"
        control={control}
        label="Genero"
        placeholder="MASCULINO, FEMININO ou vazio"
      />
      <FormInput
        name="minAge"
        control={control}
        label="Idade minima"
        keyboardType="numeric"
      />
      <FormInput
        name="maxAge"
        control={control}
        label="Idade maxima"
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmitJob)}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitBtn}
      >
        Criar vaga e buscar candidatos
      </Button>
    </ScrollView>
  );
}
