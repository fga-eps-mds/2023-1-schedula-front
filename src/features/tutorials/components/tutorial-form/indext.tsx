import { Button, Select, Grid } from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';

export function TutorialForm() {
  return (
    <form>
      <Input label="Nome do tutorial" errors={undefined} />
      <div>
        <span>Categoria</span>
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

      <Input
        label="Adicione o arquivo"
        type="file"
        errors={undefined}
        style={{ marginTop: 3 }}
      />

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
