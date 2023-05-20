import { HStack, IconButton, Button } from '@chakra-ui/react';
import { HiDownload } from 'react-icons/hi';
import { saveAs } from 'file-saver';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';

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
    const byteArray = new Uint8Array(tutorial.data.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const file = new File([blob], tutorial.filename);

    console.log(file);

    // Salvando o arquivo
    saveAs(file, tutorial.filename);
  };

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
        <Permission allowedRoles={['BASIC' || 'USER']}>
          <IconButton
            aria-label="Download Tutorial"
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
            height="100%"
            opacity={0}
          />
          <Button
            leftIcon={<HiDownload />}
            onClick={() => openFile(tutorial)}
            variant="outline"
            colorScheme="orange"
            color="black"
            borderColor="transparent"
            borderWidth={0}
            marginTop="20px"
          >
            Download
          </Button>
        </Permission>

        <Permission allowedRoles={['ADMIN']}>
          <IconButton
            aria-label="Download Tutorial"
            icon={null}
            onClick={() => openFile(tutorial)}
            variant="ghost"
            display="block"
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            width="90%"
            height="100%"
            opacity={0}
          />
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
