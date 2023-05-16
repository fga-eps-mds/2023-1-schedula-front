import { Button, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { TutorialModal } from '@/features/tutorials/components/tutorial-modal';
import { Input } from '@/components/form-fields';
import { DeleteTutorialModal } from '@/features/tutorials/components/delete-tutorial-modal';

export function GerenciarTutoriais() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const handleClose = useCallback(() => {
    onClose();
    onCloseDelete();
  }, [onClose, onCloseDelete]);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Gerenciar tutoriais">
        <Button onClick={() => navigate('/tutoriais')}> Ver tutoriais </Button>
        <Button onClick={onOpen} style={{ marginLeft: '450px' }}>
          Criar Tutorial
        </Button>
      </PageHeader>

      <Input label="" errors={undefined} placeholder="Buscar Tutorial" />

      <Button onClick={onOpenDelete} width="20%" style={{ marginTop: 20 }}>
        Excluir Tutorial
      </Button>

      <DeleteTutorialModal isOpen={isOpenDelete} onClose={onCloseDelete} />

      <TutorialModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
