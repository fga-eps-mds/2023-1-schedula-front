import { HStack } from '@chakra-ui/react';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';
import { HiDownload } from 'react-icons/hi';

interface TutorialItemProps {
  tutorial: Tutorial;
  onEdit: (tutorial: Tutorial) => void;
  onDelete: (tutorialId: string) => void;
  isDeleting: boolean;
}

export function TutorialItem({
  tutorial,
  onEdit,
  onDelete,
  isDeleting,
}: TutorialItemProps) {
  
  const openFile = (tutorial) => {
    const blob = new Blob([tutorial.data.data], { type: "application/pdf" });
    const file = new File([blob], tutorial.filename);
    console.log(file);
     // Crie uma URL temporária para o arquivo
     const fileURL = URL.createObjectURL(file);

     // Abra o arquivo em uma nova aba
     window.open(fileURL, '_blank');
  } 

  return (
    <div onClick={() => openFile(tutorial)}>

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
            onClick={() => onDelete(tutorial.id)}
            label={tutorial.name}
            isLoading={isDeleting}
          />
        </ItemActions>
      </Permission>
    </Item>
    </div>
  );
}
