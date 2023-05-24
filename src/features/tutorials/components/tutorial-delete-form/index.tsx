import { Button, Grid, ModalProps } from '@chakra-ui/react';
import { useDeleteTutorial } from '@/features/tutorials/api/detele-tutorials';
import { useCallback } from 'react';

interface DeleteTutorialFormProps extends Partial<ModalProps> {
  tutorialsIds: string[];
  onClose: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function DeleteTutorialForm({
  tutorialsIds,
  onClose,
  onClear,
  onDelete,
}: DeleteTutorialFormProps) {

  const handleDeleteTutorials = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      onDelete();
      onClear();
      onClose();
    },
    [onDelete, onClear, onClose]
  );

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
        <Button type="submit" width="45%" onClick={(e)=>handleClose(e)}>
          Cancelar
        </Button>
        <Button type="submit" width="45%" onClick={(e)=>handleDeleteTutorials(e)}>
          Confirmar
        </Button>
      </Grid>
    </form>
  );
}
