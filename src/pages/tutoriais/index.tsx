import { useCallback, useState, useEffect } from 'react';
import {
  Button,
  HStack,
  useDisclosure,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Box,
} from '@chakra-ui/react';
import { Props, Select } from 'chakra-react-select';
import { FaSearch, FaTags,  } from 'react-icons/fa';
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
import { FaTimes } from 'react-icons/fa';

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
      setSelectedState('');
    },
    [tutorials]
  );

  const handleStateChange = useCallback(
    (selectedOption: Props<any>['value']) => {
      setSelectedState(selectedOption?.value || '');
    },
    []
  );

  const resetFilter = useCallback(() => {    {/* Redefinindo o filtro e limpando a categoria selecionada */}
    setFilteredTutorials(tutorials || []);   
    setSelectedState('');
  }, [tutorials]);

  useEffect(() => {
    let updatedTutorials = tutorials || [];
    if (selectedState) {
      updatedTutorials = updatedTutorials.filter(
        (tutorial) => tutorial.state === selectedState
      );
    }
    setFilteredTutorials(updatedTutorials);
  }, [tutorials, selectedState]);

  const uniqueStates = new Set(tutorials?.map((tutorial) => tutorial.state));

  const options = [...uniqueStates].map((state) => ({
    label: state,
    value: state,
  }));


  return (


    <>
      <PageHeader title="Tutoriais" />

      <Grid templateColumns="repeat(2, 1fr)" gap={8} marginBottom="4">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} boxSize={4} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Pesquisar tutoriais"
            onChange={handleSearch}
            _placeholder={{ color: 'gray.400' }}
          />
        </InputGroup>
        
       <Select
          placeholder={
            <Box display="flex" alignItems="center">
            <Icon as={FaTags} boxSize={4} mr={2} />
            {selectedState ? (
              <>
                {selectedState}
                <Button
                  variant="ghost"
                  colorScheme="gray"
                  size="xs"
                  onClick={resetFilter}
                  marginLeft="390" 
                >
                  <Icon as={FaTimes} boxSize={4} />
                </Button>
              </>
            ) : (
              "Filtrar por categoria"
            )}
          </Box>
                   
          }
          onChange={handleStateChange}
          value={selectedState}
          options={options}
          chakraStyles={chakraStyles}
          components={customComponents}

          
        />
      </Grid>


      <ListView<Tutorial>
        items={filteredTutorials}
        render={renderTutorialItem}
        isLoading={isLoading}
      />
    </>
  );
}
