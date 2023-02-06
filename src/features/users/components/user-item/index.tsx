import { Badge, HStack } from '@chakra-ui/react';
import { Item } from '@/components/list-item';
import { Access } from '@/features/users/types';
import { User } from '@/features/users/api/types';
import { EditButton } from '@/components/action-buttons/edit-button';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';

export function RoleBadge(role: Access) {
  switch (role) {
    case 'ADMIN':
      return (
        <Badge colorScheme="purple" variant="solid">
          Administrador
        </Badge>
      );

    case 'USER':
      return <Badge>Usuário</Badge>;

    default:
      return <Badge>Básico</Badge>;
  }
}

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  isDeleting: boolean;
}

export function UserItem({
  user,
  onEdit,
  onDelete,
  isDeleting,
}: UserItemProps) {
  return (
    <Item
      title={`${user?.name} [${user?.username}]`}
      description={
        <HStack spacing={2} mt={2.5}>
          {RoleBadge(user?.profile)}
          <Badge colorScheme="gray" variant="outline">
            {user?.position}
          </Badge>
        </HStack>
      }
    >
      <ItemActions item={user}>
        <Permission
          allowedRoles={['ADMIN', 'BASIC']}
          allowCreatedByUserEmail={user.email}
        >
          <EditButton
            onClick={onEdit}
            label={user.name}
            disabled={isDeleting}
          />
        </Permission>

        <Permission allowedRoles={['ADMIN', 'BASIC']}>
          <DeleteButton
            onClick={() => onDelete(user.id)}
            label={user.name}
            isLoading={isDeleting}
            data-testid="deleteButton"
          />
        </Permission>
      </ItemActions>
    </Item>
  );
}
