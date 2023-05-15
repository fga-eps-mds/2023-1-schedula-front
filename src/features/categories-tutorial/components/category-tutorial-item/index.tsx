import { HStack } from '@chakra-ui/react';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';

interface CategoryTutorialItemProps {
  categoryTutorial: CategoryTutorial;
  onEdit: (categoryTutorial: CategoryTutorial) => void;
  onDelete: (categoryTutorialId: string) => void;
  isDeleting: boolean;
}

export function CategoryTutorialItem({
  categoryTutorial,
  onEdit,
  onDelete,
  isDeleting,
}: CategoryTutorialItemProps) {
  return (
    <Item
      title={`${categoryTutorial?.name}`}
      description={
        <HStack spacing={2} mt={2.5}>
          <p>{categoryTutorial?.state}</p>
        </HStack>
      }
    >
      <Permission allowedRoles={['ADMIN']}>
        <ItemActions item={categoryTutorial}>
          <EditButton
            onClick={onEdit}
            label={categoryTutorial.name}
            disabled={isDeleting}
          />

          <DeleteButton
            onClick={() => onDelete(categoryTutorial.id)}
            label={categoryTutorial.name}
            isLoading={isDeleting}
          />
        </ItemActions>
      </Permission>
    </Item>
  );
}
