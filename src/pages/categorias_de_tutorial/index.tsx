import { useCallback, useState } from 'react';
import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { CategoryTutorialItem } from '@/features/categories-tutorial/components/category-tutorial-item';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { CategoryTutorialModal } from '@/features/categories-tutorial/components/category-tutorial-modal/category-tutorial-modal';
import { useGetAllCategoryTutorial } from '@/features/categories-tutorial/api/get-all-categories-tutorial';
import { useDeleteCategoryTutorial } from '@/features/categories-tutorial/api/delete-category-tutorial';
import { CategoryTutorial } from '@/features/categories-tutorial/api/types';
import { Permission } from '@/components/permission';

export function CategoriasTutorial() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryTutorialToEdit, setCategoryTutorialToEdit] =
    useState<CategoryTutorial>();

  const {
    data: categoriesTutorial,
    isLoading,
    refetch,
  } = useGetAllCategoryTutorial();

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
    },
    [deleteCategoryTutorial]
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

  return (
    <>
      <PageHeader title="Categorias de Tutorial">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN']}>
            <Button onClick={onOpen}>Criar categoria</Button>
          </Permission>
        </HStack>
      </PageHeader>

      <ListView<CategoryTutorial>
        items={categoriesTutorial}
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
