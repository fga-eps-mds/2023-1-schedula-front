import { Button, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { TutorialModal } from '@/features/tutorials/components/tutorial-modal';
import { UserModal } from '@/features/users/components/user-modal';

export function Tutoriais() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <PageHeader title="Tutoriais">
        <Button onClick={onOpen}>Criar Tutorial</Button>
      </PageHeader>

      <TutorialModal />

      <TutorialModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
