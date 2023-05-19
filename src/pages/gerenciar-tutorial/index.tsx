import {
  Box,
  Button,
  Grid,
  HStack,
  Icon,
  InputGroup,
  InputLeftElement,
  Select,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaSearch, FaTags } from 'react-icons/fa';
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
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';

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

  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>(
    tutorials || []
  );

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

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.toLowerCase();
      const filteredTutorials = tutorials?.filter((tutorial) =>
        tutorial.name.toLowerCase().includes(searchText)
      );
      setFilteredTutorials(filteredTutorials || []);
      // setSelectedState('');
    },
    [tutorials]
  );

  const handleSearchCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.toLowerCase();
      console.log(searchText);
      const filteredTutorials = tutorials?.filter((tutorial) =>
        tutorial.category.name.toLowerCase().includes(searchText)
      );
      setFilteredTutorials(filteredTutorials || []);
    },
    [tutorials]
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

      <Grid templateColumns="repeat(2, 1fr)" gap={8} marginBottom="4">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon as={FaSearch} boxSize={4} color="gray.400" marginRight={3} />
          <Input
            placeholder="Pesquisar tutoriais"
            onChange={handleSearch}
            _placeholder={{ color: 'gray.400' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon as={FaSearch} boxSize={4} color="gray.400" marginRight={3} />
          <Input
            placeholder="Pesquisar Categorias"
            onChange={handleSearchCategory}
            _placeholder={{ color: 'gray.400' }}
          />
        </div>
      </Grid>

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
        items={filteredTutorials.length === 0 ? tutorials : filteredTutorials}
        render={renderTutorialItem}
        isLoading={isLoading}
      />
    </>
  );
}