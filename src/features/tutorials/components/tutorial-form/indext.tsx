import { Button, Select, Grid } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { result } from 'lodash';
import axios from 'axios';
import { ControlledSelect, Input } from '@/components/form-fields';
import { InputFile } from '../tutorial-file';
import { TutorialFileCard } from '../tutorial-file-card';
import { Tutorial, TutorialPayload } from '../../type';

interface TutorialFromProps {
  defaultValues?: TutorialPayload;
  onSubmit: (data: TutorialPayload) => void;
  isSubmitting: boolean;
}

export function TutorialForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: TutorialFromProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Input
        label="Nome do tutorial"
        {...register('name', { required: 'Campo obrigatório' })}
        placeholder="Digite o nome do tutorial"
        errors={errors?.name}
      />

      <Input
        label="ID da categoria"
        {...register('category_id', { required: 'Campo obrigatório' })}
        placeholder="Digite o id da categoria"
        errors={errors?.name}
      />

      {/* <ControlledSelect
        control={control}
        name="city_payload"
        id="city_payload"
        options={citiesOptions}
        isLoading={isLoadingCities}
        placeholder="Cidade"
        label="Cidade"
        rules={{ required: 'Campo obrigatório' }}
      /> */}

      <Input
        label="Arquivo do tutorial"
        type="file"
        // Call handleFile function when a file is selected before uploading
        {...register('file', { required: 'Campo obrigatório' })}
        placeholder="Selecione o arquivo do tutorial"
        errors={errors?.name}
      />

      <Grid templateColumns="1fr 0fr" style={{ marginTop: 12 }}>
        <Button size="lg" width="45%">
          Cancelar
        </Button>
        <Button type="submit" size="lg" width="45%" isLoading={isSubmitting}>
          {isEditing ? 'Salvar' : 'Criar Tutorial'}
        </Button>
      </Grid>
    </form>
  );
}
