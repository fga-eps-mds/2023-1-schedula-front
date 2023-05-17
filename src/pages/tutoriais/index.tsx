import { useNavigate, Link } from 'react-router-dom';
import { Button, useDisclosure } from '@chakra-ui/react';

import { useCallback, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { GerenciarTutoriais } from '../gerenciar-tutorial';
import { ListView } from '@/components/list';
import { User } from '@/features/users/api/types';
import { UserItem } from '@/features/users/components/user-item';
import { useDeleteRemoveUser } from '@/features/users/api/delete-remove-user';
import { useGetAllUsers } from '@/features/users/api/get-all-users';

export function Tutoriais() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userToEdit, setUserToEdit] = useState<User>();

  const { data: users, isLoading, refetch } = useGetAllUsers();

  const { mutate: deleteUser, isLoading: isRemovingUser } =
    useDeleteRemoveUser();

  const onEdit = useCallback(
    (user: User) => {
      setUserToEdit(user);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (userId: string) => {
      deleteUser({ userId });
    },
    [deleteUser]
  );

  const handleClose = useCallback(() => {
    setUserToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderUserItem = useCallback(
    (user: User) => {
      return (
        <UserItem
          user={user}
          onEdit={() => onEdit(user)}
          onDelete={() => onDelete(user.id)}
          isDeleting={isRemovingUser}
        />
      );
    },
    [onDelete, onEdit, isRemovingUser]
  );

  return (
    <PageHeader title="Tutoriais">
      <Button variant="primary" onClick={() => navigate('gerenciar-tutorial')}>
        Gerenciar tutoriais
      </Button>
    </PageHeader>
  );
}
