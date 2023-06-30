import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';

import { ListView } from '@/components/list';

import { useDeleteProblemCategory } from '@/features/problem/api/delete-problem-category';
import { ProblemCategory } from '@/features/problem/api/types';
import { CategoryItem } from '@/features/problem/problem-categories/components/category-item';
import { CategoryModal } from '@/features/problem/problem-categories/components/category-modal/category-modal';
import { useGetAllProblemCategories } from '@/features/problem/api/get-all-problem-category';
import { Permission } from '@/components/permission';

function ProblemCategories() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [problemCategoryToEdit, setProblemCategoryToEdit] =
    useState<Category>();

  const { data: categories, isLoading, refetch } = useGetAllProblemCategories();

  const {
    mutate: deleteProblemCategory,
    isLoading: isRemovingProblemCategory,
  } = useDeleteProblemCategory();

  const onEdit = useCallback(
    (category: Category) => {
      setProblemCategoryToEdit(category);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (id: string) => {
      deleteProblemCategory({ id });
    },
    [deleteProblemCategory]
  );

  const handleClose = useCallback(() => {
    setProblemCategoryToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderProblemCategoryItem = useCallback(
    (category: ProblemCategory) => (
      <CategoryItem
        category={category}
        onEdit={() => onEdit(category)}
        onDelete={onDelete}
        isDeleting={isRemovingProblemCategory}
      />
    ),
    [onDelete, onEdit, isRemovingProblemCategory]
  );

  return (
    <>
      <PageHeader title="Categorias de problema">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN', 'BASIC']}>
            <Button onClick={onOpen}>Nova Categoria</Button>
          </Permission>
        </HStack>
      </PageHeader>

      <ListView<ProblemCategory>
        items={categories}
        render={renderProblemCategoryItem}
        isLoading={isLoading}
      />

      <CategoryModal
        isOpen={isOpen}
        onClose={handleClose}
        category={problemCategoryToEdit}
      />
    </>
  );
}

export default ProblemCategories;
