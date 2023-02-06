import { HStack } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { AddButton } from '@/components/action-buttons/add-button';
import { Permission } from '@/components/permission';

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function CategoryItem({
  category,
  onEdit,
  onDelete,
  isDeleting,
}: CategoryItemProps) {
  const navigate = useNavigate();

  const handleAddProblem = useCallback(
    ({ id }: Category) => {
      navigate(`/categorias/${id}`);
    },
    [navigate]
  );

  return (
    <Item
      title={`${category?.name}`}
      description={
        <HStack spacing={2} mt={2.5}>
          <p>{category?.description}</p>
        </HStack>
      }
    >
      <ItemActions item={category}>
        <AddButton
          onClick={handleAddProblem}
          label="Tipos de Problema"
          aria-label="Add"
        />
        <Permission allowedRoles={['ADMIN']}>
          <EditButton
            onClick={onEdit}
            label={category.name}
            disabled={isDeleting}
          />

          <DeleteButton
            onClick={() => onDelete(category.id)}
            label={category.name}
            isLoading={isDeleting}
          />
        </Permission>
      </ItemActions>
    </Item>
  );
}
