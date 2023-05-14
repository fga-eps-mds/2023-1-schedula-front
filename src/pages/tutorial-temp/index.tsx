import { Button, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { TutorialModal } from '@/features/tutorials/components/tutorial-modal';
import { Input } from '@/components/form-fields';
import { DeleteTutorialModal } from '@/features/tutorials/components/delete-tutorial-modal';

export function Tutoriais() {
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

  return (
    <>
      <PageHeader title="Tutoriais">
        <Button onClick={onOpen}>Criar Tutorial</Button>
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
