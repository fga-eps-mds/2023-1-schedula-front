import { Button, HStack, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { PageHeader } from '@/components/page-header';
import { TutorialModal } from '@/features/tutorials/components/tutorial-modal';
import { Input } from '@/components/form-fields';
import { DeleteTutorialModal } from '@/features/tutorials/components/delete-tutorial-modal';
import { ListView } from '@/components/list';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { useGetallTutorials } from '@/features/tutorials/api/get-all-tutorials';
import { TutorialItem } from '@/features/tutorials/components/tutorial-item';
import { Tutorial } from '@/features/tutorials/type';
import { useDeleteTutorial } from '@/features/tutorials/api/detele-tutorials';
import { Permission } from '@/components/permission';

export function GerenciarTutoriais() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tutorialToEdit, setTutorialToEdit] = useState<Tutorial>();

  // Clear tutorial to edit when modal is closed
  if (!isOpen && tutorialToEdit) {
    setTutorialToEdit(undefined);
  }

  const navigate = useNavigate();

  const { data: tutorials, isLoading, refetch } = useGetallTutorials();

  const { mutate: deleteTutorial, isLoading: isRemovingTutorial } =
    useDeleteTutorial();

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
    (tutorial: Tutorial) => {
      return (
        <TutorialItem
          tutorial={tutorial}
          onEdit={() => onEdit(tutorial)}
          onDelete={() => onDelete(tutorial.id)}
          isDeleting={isRemovingTutorial}
        />
      );
    },
    [onDelete, onEdit, isRemovingTutorial]
  );

  return (
    <>
      <PageHeader title="Gerenciar tutoriais">
        <HStack>
          <Tooltip
            label="Voltar para Tutoriais"
            placement="top"
            color="white"
            bg="gray"
          >
            <span>
              <IoArrowBackCircleOutline
                style={{ cursor: 'pointer' }}
                size={35}
                onClick={() => navigate('/tutoriais')}
              />
            </span>
          </Tooltip>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN']}>
            <Button onClick={onOpen} style={{ marginLeft: '40px' }}>
              Criar Tutorial
            </Button>
          </Permission>
        </HStack>
      </PageHeader>

      <Input label="" errors={undefined} placeholder="Buscar Tutorial" />

      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Button onClick={onDelete} width="10%">
          Excluir Tutorial
        </Button>
      </div> */}

      {/* <DeleteTutorialModal isOpen={isOpenDelete} onClose={onCloseDelete} /> */}

      <TutorialModal
        isOpen={isOpen}
        onClose={onClose}
        tutorial={tutorialToEdit}
      />

      <ListView<Tutorial>
        items={tutorials}
        render={renderTutorialItem}
        isLoading={isLoading}
      />
    </>
  );
}
