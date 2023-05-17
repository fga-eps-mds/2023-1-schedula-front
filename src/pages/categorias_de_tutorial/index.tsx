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
import { CategoryTutorialItem } from '@/features/categories-tutorial/components/category-tutorial-item';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { CategoryTutorialModal } from '@/features/categories-tutorial/components/category-tutorial-modal/category-tutorial-modal';
import { useGetAllCategoryTutorial } from '@/features/categories-tutorial/api/get-all-categories-tutorial';
import { useDeleteCategoryTutorial } from '@/features/categories-tutorial/api/delete-category-tutorial';
import { CategoryTutorial } from '@/features/categories-tutorial/api/types';
import { Permission } from '@/components/permission';
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';

export function CategoriasTutorial() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedState, setSelectedState] = useState<string>('');

  const [categoryTutorialToEdit, setCategoryTutorialToEdit] =
    useState<CategoryTutorial>();

  const {
    data: categoriesTutorial,
    isLoading,
    refetch,
  } = useGetAllCategoryTutorial();

  const [filteredCategoriesTutorial, setFilteredCategoriesTutorial] = useState<
    CategoryTutorial[]
  >(categoriesTutorial || []);

  const {
    mutate: deleteCategoryTutorial,
    isLoading: isRemovingCategoryTutorial,
  } = useDeleteCategoryTutorial();

  const onEdit = useCallback(
    (categoryTutorial: CategoryTutorial) => {
      setCategoryTutorialToEdit(categoryTutorial);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (categoryTutorialId: string) => {
      deleteCategoryTutorial({ categoryTutorialId });
      refetch();
    },
    [deleteCategoryTutorial, refetch]
  );

  const handleClose = useCallback(() => {
    setCategoryTutorialToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderCategoryTutorialItem = useCallback(
    (categoryTutorial: CategoryTutorial) => (
      <CategoryTutorialItem
        categoryTutorial={categoryTutorial}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isRemovingCategoryTutorial}
      />
    ),
    [onDelete, onEdit, isRemovingCategoryTutorial]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.toLowerCase();
      const filteredCategoriesTutorial = categoriesTutorial?.filter(
        (categoryTutorial) =>
          categoryTutorial.name.toLowerCase().includes(searchText)
      );
      setFilteredCategoriesTutorial(filteredCategoriesTutorial || []);
    },
    [categoriesTutorial]
  );

  useEffect(() => {
    const updatedCategoriesTutorial = categoriesTutorial || [];
    setFilteredCategoriesTutorial(updatedCategoriesTutorial);
  }, [categoriesTutorial]);

  return (
    <>
      <PageHeader title="Categorias de Tutoriais">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN']}>
            <Button onClick={onOpen}>Criar categoria</Button>
          </Permission>
        </HStack>
      </PageHeader>

      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <Input
          placeholder="Pesquisar Categorias"
          onChange={handleSearch}
          marginBottom="4"
        />
      </Grid>

      <ListView<CategoryTutorial>
        items={filteredCategoriesTutorial}
        render={renderCategoryTutorialItem}
        isLoading={isLoading}
      />

      <CategoryTutorialModal
        isOpen={isOpen}
        onClose={handleClose}
        categoryTutorial={categoryTutorialToEdit}
      />
    </>
  );
}
