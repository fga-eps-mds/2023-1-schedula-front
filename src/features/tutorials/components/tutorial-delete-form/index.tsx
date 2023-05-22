import { Button, Grid } from '@chakra-ui/react';

export function DeleteTutorialForm() {
  return (
    <form>
      <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Tem certeza que deseja excluir o(s) tutorial(is)
      </p>
      <p style={{ textAlign: 'center', color: 'yellow' }}>
        (!) ATENÇÃO - Serão excluídos os tutoriais selecionados
      </p>

      <Grid templateColumns="1fr 0fr" style={{ paddingTop: 20 }}>
        <Button type="submit" width="45%">
          Cancelar
        </Button>
        <Button type="submit" width="45%">
          Confirmar
        </Button>
      </Grid>
    </form>
  );
}
