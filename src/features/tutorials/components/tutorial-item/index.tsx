import { HStack, IconButton, Button } from '@chakra-ui/react';
import { HiDownload } from 'react-icons/hi';
import { saveAs } from 'file-saver';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';
import { Tutorial } from '@/features/tutorials/api/types';

interface TutorialItemProps {
  tutorial: Tutorial;
}

export function TutorialItem({ tutorial }: TutorialItemProps) {
  const openFile = (tutorial: Tutorial) => {
    const byteArray = new Uint8Array(tutorial.data.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const file = new File([blob], tutorial.filename);
    saveAs(file, tutorial.filename);

    const fileUrl = URL.createObjectURL(blob);
    return fileUrl;
  };

  const handleOpenFile = (tutorial: Tutorial) => {
    const fileUrl = openFile(tutorial);
    window.open(fileUrl, '_blank');
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
            onClick={() => handleOpenFile(tutorial)}
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
            aria-label="Download Tutorial"
            leftIcon={<HiDownload />}
            onClick={() => handleOpenFile(tutorial)}
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
            onClick={() => handleOpenFile(tutorial)}
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
              aria-label="Download Tutorial"
              leftIcon={<HiDownload />}
              onClick={() => handleOpenFile(tutorial)}
              variant="outline"
              colorScheme="orange"
              color="black"
              borderColor="transparent"
              borderWidth={0}
            >
              Download
            </Button>
          </ItemActions>
        </Permission>
      </Item>
    </div>
  );
}
