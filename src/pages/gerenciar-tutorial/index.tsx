import { Button, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { TutorialModal } from '@/features/tutorials/components/tutorial-modal';
import { Input } from '@/components/form-fields';
import { DeleteTutorialModal } from '@/features/tutorials/components/delete-tutorial-modal';
import { ListView } from '@/components/list';
import { User } from '@/features/users/api/types';
import { UserItem } from '@/features/users/components/user-item';
import { useDeleteRemoveUser } from '@/features/users/api/delete-remove-user';
import { useGetAllUsers } from '@/features/users/api/get-all-users';

export function GerenciarTutoriais() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const handleCloseModal = useCallback(() => {
    onClose();
    onCloseDelete();
  }, [onClose, onCloseDelete]);

  const navigate = useNavigate();

  const { data: users, isLoading, refetch } = useGetAllUsers();

  const { mutate: deleteUser, isLoading: isRemovingUser } =
    useDeleteRemoveUser();

  /* const onEdit = useCallback(
    (user: User) => {
      setUserToEdit(user);
      onOpen();
    },
    [onOpen]
  ); */

  const onDelete = useCallback(
    (userId: string) => {
      deleteUser({ userId });
    },
    [deleteUser]
  );

  const renderUserItem = useCallback(
    (user: User) => {
      return (
        <UserItem
          user={user}
          onEdit={undefined}
          onDelete={() => onDelete(user.id)}
          isDeleting={isRemovingUser}
        />
      );
    },
    [onDelete, isRemovingUser]
  );

  return (
    <>
      <PageHeader title="Gerenciar tutoriais">
        <Button onClick={() => navigate('/tutoriais')}> Ver tutoriais </Button>
        <Button onClick={onOpen} style={{ marginLeft: '40px' }}>
          Criar Tutorial
        </Button>
      </PageHeader>

      <Input label="" errors={undefined} placeholder="Buscar Tutorial" />

      <Button onClick={onOpenDelete} width="20%" style={{ marginTop: 20 }}>
        Excluir Tutorial
      </Button>

      <DeleteTutorialModal isOpen={isOpenDelete} onClose={onCloseDelete} />

      <TutorialModal isOpen={isOpen} onClose={onClose} />

      <ListView<User>
        items={users}
        render={renderUserItem}
        isLoading={isLoading}
      />
    </>
  );
}
function setUserToEdit(user: User) {
  throw new Error('Function not implemented.');
}
