import { Button, Select, Grid } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ControlledSelect, Input } from '@/components/form-fields';
import { InputFile } from '../tutorial-file';
import { UserFormValues } from '@/features/users/components/user-form';
import { TutorialFileCard } from '../tutorial-file-card';

export function TutorialForm() {
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

  const receiveFile = () => {
    const id = document.getElementById('id').value;

    const formData = new FormData();
    formData.append('id', id);

    // Get file id using XMLHttpRequest
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:3004/categories/');
    xhr.send();
    console.log(xhr.response);
  };

  return (
    <form>
      <Input
        label="Nome do tutorial"
        placeholder="Digite o nome do tutorial"
        errors={undefined}
      />

      {/* <Button id='id' onClick={receiveFile}>Teste</Button> */}

      <div style={{ marginTop: '10px' }}>
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
      </div>
      <InputFile />

      <TutorialFileCard />

      <Grid templateColumns="1fr 0fr" style={{ marginTop: 12 }}>
        <Button type="submit" size="lg" width="45%">
          Criar Tutorial
        </Button>
        <Button type="submit" size="lg" width="45%">
          Cancelar
        </Button>
      </Grid>
    </form>
  );
}
