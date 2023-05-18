import { Button, Select, Grid } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
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
  /* const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      ...defaultValues,
      profile: {
        label: defaultValues?.profile
          ? USER_ACCESS[defaultValues.profile]
          : USER_ACCESS.USER,
        value: defaultValues ? defaultValues.profile : 'BASIC',
      },
      password: '',
    },
  }); */

  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TutorialPayload>({
    defaultValues: {
      ...defaultValues,
    },
  });

  /* const receiveFile = () => {
    const id = document.getElementById('id').value;

    const formData = new FormData();
    formData.append('id', id);

    // Get file id using XMLHttpRequest
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:3004/categories/');
    xhr.send();
    console.log(xhr.response);
  }; */

  const filepicker = document.getElementById('file-picker');
  const [filename, setFileName] = useState();

  /* filepicker?.addEventListener('change', (e) => {
    const files = e.target.files;

    for (const file of files) {
        setFileName(file.name)
    }

  })

  useEffect(() => {
    console.log(filename)
  }, [filename])
 */

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome do tutorial"
        {...register('name', { required: 'Campo obrigatório' })}
        placeholder="Digite o nome do tutorial"
        errors={errors?.name}
      />

      <Input
        label="ID do tutorial"
        {...register('category', { required: 'Campo obrigatório' })}
        placeholder="Digite o id do tutorial"
        errors={errors?.name}
      />

      {/* <div style={{ marginTop: '10px' }}>
        <span style={{ fontWeight: '500' }}>Categoria</span>
        <Select
          className="select"
          placeholder="Selecione a Categoria"
          style={{ marginTop: 8 }}
        >
          <option value="Criação de ponto de rede">
            Criação de ponto de rede
          </option>
          <option value="Redefinição de senha">Redefinição de senha</option>
        </Select>
      </div> */}

      {/* <InputFile 
        {...register('file', { required: 'Campo obrigatório'})}
      /> */}

      {/* <Input
        id='file-picker'
        label='Selecione o arquivo'
        errors={errors?.name}
        type='file'
        {...register('file', {required: 'Campo Obrigatório'})}
      /> */}
      <input type="file" id="file-picker" {...register('file')} />

      <TutorialFileCard filename={filename} />

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
