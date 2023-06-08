import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect, useMemo } from 'react';
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Props, Select } from 'chakra-react-select';
import { FaSearch, FaTags } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import { NotificacaoAdmin } from './notificacoes_admin';
import { PageHeader } from '@/components/page-header';
import { useGetallTutorials } from '@/features/tutorials/api/get-all-tutorials';
import { ListView } from '@/components/list';
import { TutorialItem } from '@/features/tutorials/components/tutorial-item';
import { Tutorial } from '@/features/tutorials/api/types';
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';
import { Permission } from '@/components/permission';

export function Notificacoes() {
  const { data: tutorials, isLoading } = useGetallTutorials();

  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>(
    tutorials || []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const renderTutorialItem = useCallback(
    (tutorial: Tutorial) => <TutorialItem tutorial={tutorial} />,
    []
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.toLowerCase();
      const filteredTutorials = tutorials?.filter((tutorial) =>
        tutorial.name.toLowerCase().includes(searchText)
      );
      setFilteredTutorials(filteredTutorials || []);
      setSelectedCategory('');
    },
    [tutorials]
  );

  const handleResetFilters = useCallback(() => {
    setFilteredTutorials(tutorials || []);
    setSelectedCategory('');
  }, [tutorials]);

  const handleCategoryChange = useCallback(
    (selectedOption: Props<any>['value']) => {
      if (selectedOption?.value === '') {
        handleResetFilters();
      } else {
        setSelectedCategory(selectedOption?.value || '');
      }
    },
    [handleResetFilters]
  );

  useEffect(() => {
    let updatedTutorials = tutorials || [];
    if (selectedCategory) {
      updatedTutorials = updatedTutorials.filter(
        (tutorial) => tutorial.category.name === selectedCategory
      );
    }
    updatedTutorials.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredTutorials(updatedTutorials);
  }, [tutorials, selectedCategory, handleResetFilters]);

  const resetButton = selectedCategory ? (
    <Button
      variant="link"
      colorScheme="gray"
      size="xs"
      onClick={handleResetFilters}
      marginLeft={2}
    >
      <CloseIcon boxSize={3} />
    </Button>
  ) : null;

  const options = useMemo(() => {
    const uniqueCategories = new Set(
      tutorials?.map((tutorial) => tutorial.category.name)
    );

    const allCategoriesOption = { label: 'Todas as categorias', value: '' };
    const categoryOptions = [...uniqueCategories].map((category) => ({
      label: category,
      value: category,
    }));

    return selectedCategory
      ? [allCategoriesOption, ...categoryOptions]
      : categoryOptions;
  }, [tutorials, selectedCategory]);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Notificações">
        <Permission allowedRoles={['ADMIN']}>
          <Button
            variant="primary"
            onClick={() => navigate('gerenciar-tutorial')}
            style={{ marginLeft: 30 }}
          >
            Notificar
          </Button>
        </Permission>
      </PageHeader>

      <Select
        aria-label="Filtrar por categoria"
        placeholder={
          <Flex alignItems="center">
            <Icon as={FaTags} boxSize={4} mr={2} />
            Status
            {resetButton}
          </Flex>
        }
        onChange={handleCategoryChange}
        value={selectedCategory}
        options={options}
        chakraStyles={chakraStyles}
        components={customComponents}
      />

      <ListView<Tutorial>
        items={filteredTutorials}
        render={renderTutorialItem}
        isLoading={isLoading}
      />
    </>
  );
}
