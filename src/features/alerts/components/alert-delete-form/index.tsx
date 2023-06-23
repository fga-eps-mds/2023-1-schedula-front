import { Button, Grid, ModalProps } from '@chakra-ui/react';
import { useCallback } from 'react';

interface DeleteAlertFormProps extends Partial<ModalProps> {
  onClose: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function DeleteAlertForm({
  onClose,
  onClear,
  onDelete,
}: DeleteAlertFormProps) {
  const handleDeleteAlerts = useCallback(
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
        Tem certeza que deseja excluir o(s) alerta(s)
      </p>
      <p style={{ textAlign: 'center', color: 'yellow' }}>
        (!) ATENÇÃO - Serão excluídos os alertas selecionados
      </p>

      <Grid templateColumns="1fr 0fr" style={{ paddingTop: 20 }}>
        <Button type="submit" width="45%" onClick={(e) => handleClose(e)}>
          Cancelar
        </Button>
        <Button
          type="submit"
          width="45%"
          onClick={(e) => handleDeleteAlerts(e)}
        >
          Confirmar
        </Button>
      </Grid>
    </form>
  );
}
