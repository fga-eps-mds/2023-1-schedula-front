import { HStack, IconButton, Button } from '@chakra-ui/react';
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
    <div>
      <Item
        title={`${tutorial?.name}`}
        description={
          <HStack spacing={2} mt={2.5}>
            <p>{tutorial?.category.name}</p>
          </HStack>
        }
      >
        <IconButton
          aria-label="Invisible Button"
          icon={null}
          onClick={() => openFile(tutorial)}
          variant="ghost"
          display="block"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          width="100%"
          opacity={0}
          zIndex={1}
        />

        <Permission allowedRoles={['BASIC' || 'USER']}>
          <Button
            leftIcon={<HiDownload />}
            onClick={() => openFile(tutorial)}
            variant="outline"
            colorScheme="orange"
            color="black"
            borderColor="transparent"
            borderWidth={0}
          >
            Download
          </Button>
        </Permission>

      <Permission allowedRoles={['ADMIN']}>
        <ItemActions item={tutorial}>
          <Button
            leftIcon={<HiDownload />}
            onClick={() => openFile(tutorial)}
            variant="outline"
            colorScheme="orange"
            color="black"
            borderColor="transparent"
            borderWidth={0}
          >
            Download
          </Button>
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
