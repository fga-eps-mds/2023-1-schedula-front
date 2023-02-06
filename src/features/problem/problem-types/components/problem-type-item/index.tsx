import { useCallback } from 'react';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ProblemType } from '@/features/problem/problem-types/types';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';

interface ProblemTypeItemProps {
  problemType: ProblemType;
  onEdit: (problemType: ProblemType) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function ProblemTypeItem({
  problemType,
  onEdit,
  onDelete,
  isDeleting,
}: ProblemTypeItemProps) {
  const handleDelete = useCallback(async () => {
    onDelete?.(problemType.id);
  }, [problemType, onDelete]);

  return (
    <Item<ProblemType> title={problemType?.name} description="">
      <Permission allowedRoles={['ADMIN', 'BASIC']}>
        <ItemActions item={problemType}>
          <EditButton
            onClick={onEdit}
            label={problemType.name}
            isLoading={isDeleting}
            isDisabled={isDeleting}
          />

          <DeleteButton
            onClick={handleDelete}
            label={problemType.name}
            isLoading={isDeleting}
            isDisabled={isDeleting}
          />
        </ItemActions>
      </Permission>
    </Item>
  );
}
