import { useCallback, useState, useEffect } from 'react';
import {
  Button,
  HStack,
  useDisclosure,
  Input,
  Select,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { PageHeader } from '@/components/page-header';
import { useGetAllTutorials } from '@/features/tutorials/api/get-all-tutorials';
import { ListView } from '@/components/list';
import { TutorialItem } from '@/features/tutorials/components/tutorial-item';
import { useDeleteTutorial } from '@/features/tutorials/api/delete-tutorial';
import { Tutorial } from '@/features/tutorials/api/types';
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';

export function Tutoriais() {
  const { data: tutorials, isLoading, refetch } = useGetAllTutorials();
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>(
    tutorials || []
  );
  const [selectedState, setSelectedState] = useState<string>('');

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

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.toLowerCase();
      const filteredTutorials = tutorials?.filter((tutorial) =>
        tutorial.name.toLowerCase().includes(searchText)
      );
      setFilteredTutorials(filteredTutorials || []);
    },
    [tutorials]
  );

  const handleStateChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedState = event.target.value;
      setSelectedState(selectedState);
    },
    []
  );

  const uniqueCategories = new Set(
    tutorials?.map((tutorial) => tutorial.state)
  );

  console.log(uniqueCategories);

  useEffect(() => {
    let updatedTutorials = tutorials || [];
    if (selectedState) {
      updatedTutorials = updatedTutorials.filter(
        (tutorial) => tutorial.state === selectedState
      );
    }
    setFilteredTutorials(updatedTutorials);
  }, [tutorials, selectedState]);

  return (
    <>
      <PageHeader title="Tutoriais" />

      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <Input
          placeholder="Pesquisar tutoriais"
          onChange={handleSearch}
          marginBottom="4"
        />

        <Select
          placeholder="Filtrar por estado"
          onChange={handleStateChange}
          value={selectedState}
          chakraStyles={chakraStyles}
          marginBottom="4"
        >
          {[...uniqueCategories].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </Grid>

      <ListView<Tutorial>
        items={filteredTutorials}
        render={renderTutorialItem}
        isLoading={isLoading}
      />
    </>
  );
}
