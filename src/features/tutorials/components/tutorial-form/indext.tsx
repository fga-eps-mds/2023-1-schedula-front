import { Button, Select, Grid } from '@chakra-ui/react';
import { Input } from '@/components/form-fields';
import { InputFile } from '../tutorial-file';

export function TutorialForm() {
  return (
    <form>
      <Input
        label="Nome do tutorial"
        placeholder="Digite o nome do tutorial"
        errors={undefined}
      />
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
