import { useCallback, useState } from 'react';
import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { PageHeader } from '@/components/page-header';
import { useGetAllTutorials } from '@/features/tutorials/api/get-all-tutorials';
import { ListView } from '@/components/list';
import { TutorialItem } from '@/features/tutorials/components/tutorial-item';
import { useDeleteTutorial } from '@/features/tutorials/api/delete-tutorial';
import { Tutorial } from '@/features/tutorials/api/types';

export function Tutoriais() {
  const { data: tutorials, isLoading, refetch } = useGetAllTutorials();

  const { mutate: deleteTutorial, isLoading: isRemovingTutorial } =
    useDeleteTutorial();

  const [tutorialToEdit, setTutorialToEdit] = useState<Tutorial>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onEdit = useCallback(
    (tutorial: Tutorial) => {
      setTutorialToEdit(tutorial);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (tutorialId: string) => {
      deleteTutorial({ tutorialId });
    },
    [deleteTutorial]
  );

  const renderTutorialItem = useCallback(
    (tutorial: Tutorial) => (
      <TutorialItem
        tutorial={tutorial}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isRemovingTutorial}
      />
    ),
    [onDelete, onEdit, isRemovingTutorial]
  );

  return (
    <>
      <PageHeader title="Tutoriais" />

      <ListView<Tutorial>
        items={tutorials}
        render={renderTutorialItem}
        isLoading={isLoading}
      />
    </>
  );
}
