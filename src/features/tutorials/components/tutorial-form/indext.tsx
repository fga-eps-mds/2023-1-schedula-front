import { Button, GridItem } from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';

export function TutorialForm() {
  return (
    <form>
      <Input label="Nome do tutorial" errors={undefined} />

      <Input label="Categoria" errors={undefined} />

      <GridItem colSpan={2}>
        <Button type="submit" size="lg" width="100%">
          Criar Tutorial
        </Button>
      </GridItem>
    </form>
  );
}
