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
  defaultValues?: Tutorial;
  onSubmit: (data: TutorialPayload) => void;
  isSubmitting: boolean;
}

export function TutorialForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: TutorialFromProps) {
  const [fileContent, setFileContent] = useState<string | null>();

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

  const onSubmitFile = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category_id', data.category_id);
    formData.append('file', data.file[0]);

    console.log(formData);

    console.log(formData.get('file'));

    // Create a TutorialPayload object
    // const tutorialPayload: TutorialPayload = {
    //   name: data.name,
    //   category_id: data.category_id,
    //   file: formData.get('file')
    // };

    // onSubmit(tutorialPayload);

    axios.post('http://localhost:3004/tutorials', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFile)} encType="multipart/form-data">
      <Input
        label="Nome do tutorial"
        {...register('name', { required: 'Campo obrigatório' })}
        placeholder="Digite o nome do tutorial"
        errors={errors?.name}
      />

      <Input
        label="ID do tutorial"
        {...register('category_id', { required: 'Campo obrigatório' })}
        placeholder="Digite o id do tutorial"
        errors={errors?.name}
      />

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
