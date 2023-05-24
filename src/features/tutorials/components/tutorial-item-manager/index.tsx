import { HStack } from '@chakra-ui/react';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';
import { Tutorial } from '../../type';

interface TutorialItemManagerProps {
  tutorial: Tutorial;
  onEdit: (tutorial: Tutorial) => void;
  onDelete: (tutorialId: string) => void;
  isDeleting: boolean;
}

export function TutorialItemManager({
  tutorial,
  onEdit,
  onDelete,
  isDeleting,
}: TutorialItemManagerProps) {
  return (
    <Item
      title={`${tutorial?.name}`}
      description={
        <HStack spacing={2} mt={2.5}>
          <p>{tutorial?.category.name}</p>
        </HStack>
      }
    >
      <Permission allowedRoles={['ADMIN']}>
        <ItemActions item={tutorial}>
          <EditButton
            onClick={onEdit}
            label={tutorial.name}
            disabled={isDeleting}
          />

          <DeleteButton
            onClick={() => {
              if (tutorial.id) {
                onDelete(tutorial.id);
              }
            }}
            label={tutorial.name}
            isLoading={isDeleting}
          />
        </ItemActions>
      </Permission>
    </Item>
  );
}
