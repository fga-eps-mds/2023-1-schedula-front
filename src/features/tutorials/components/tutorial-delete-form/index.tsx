import { Button, Grid, ModalProps } from '@chakra-ui/react';
import { useDeleteTutorial } from '@/features/tutorials/api/detele-tutorials';

interface DeleteTutorialFormProps extends Partial<ModalProps> {
  tutorialsIds: string[];
  onClose: () => void;
}

export function DeleteTutorialForm({
  tutorialsIds,
  onClose,
}: DeleteTutorialFormProps) {
  const { mutate: deleteTutorial, isLoading: isRemovingTutorial } =
    useDeleteTutorial();

  const handleDeleteTutorials = (e) => {
    e.preventDefault();
    tutorialsIds.forEach((tutorialId) => {
      deleteTutorial({ tutorialId });
    });
    onClose();
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form>
      <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Tem certeza que deseja excluir o(s) tutorial(is)
      </p>
      <p style={{ textAlign: 'center', color: 'yellow' }}>
        (!) ATENÇÃO - Serão excluídos os tutoriais selecionados
      </p>

      <Grid templateColumns="1fr 0fr" style={{ paddingTop: 20 }}>
        <Button type="submit" width="45%" onClick={handleClose}>
          Cancelar
        </Button>
        <Button type="submit" width="45%" onClick={handleDeleteTutorials}>
          Confirmar
        </Button>
      </Grid>
    </form>
  );
}
