import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';
import { CategoryTutorial } from '../../types';

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
    <Item title={`${categoryTutorial?.name}`}>
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
