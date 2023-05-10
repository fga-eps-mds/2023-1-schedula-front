import { useCallback, useState } from 'react';
import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { useGetAllUsers } from '@/features/users/api/get-all-users';
import { User } from '@/features/users/api/types';
import { useDeleteRemoveUser } from '@/features/users/api/delete-remove-user';
import { UserModal } from '@/features/users/components/user-modal';
import { UserItem } from '@/features/users/components/user-item';
import { Permission } from '@/components/permission';

function Usuarios() {
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
    <>
      <PageHeader title="Gerenciar Usuários">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN', 'BASIC']}>
            <Button onClick={onOpen}>Novo Usuário</Button>
          </Permission>
        </HStack>
      </PageHeader>

      <ListView<User>
        items={users}
        render={renderUserItem}
        isLoading={isLoading}
      />

      <UserModal isOpen={isOpen} onClose={handleClose} user={userToEdit} />
    </>
  );
}

export default Usuarios;
