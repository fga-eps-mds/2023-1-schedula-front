import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { usePostCreateCategoryTutorial } from '@/features/categories-tutorial/api/post-create-category-tutorial';
import { usePutUpdateCategoryTutorial } from '@/features/categories-tutorial/api/put-update-category-tutorial';
import { PostCreateCategoryTutorialParams } from '@/features/categories-tutorial/api/types';
import { Modal } from '@/components/modal';
import { CategoryTutorialForm } from '@/features/categories-tutorial/components/category-tutorial-form';

interface CategoryTutorialModalProps extends Partial<ModalProps> {
  categoryTutorial?: CategoryTutorial;
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryTutorialModal({
  onClose,
  categoryTutorial,
  ...props
}: CategoryTutorialModalProps) {
  const {
    mutate: createCategoryTutorial,
    isLoading: isCreatingCategoryTutorial,
  } = usePostCreateCategoryTutorial({
    onSuccessCallBack: onClose,
  });

  const {
    mutate: updateCategoryTutorial,
    isLoading: isUpdatingCategoryTutorial,
  } = usePutUpdateCategoryTutorial({
    onSuccessCallBack: onClose,
  });

  const handleSubmit = useCallback(
    async ({ name }: CategoryTutorialPayload) => {
      const payload: PostCreateCategoryTutorialParams = {
        name,
      };

      if (categoryTutorial?.id) {
        updateCategoryTutorial({
          categoryTutorialId: categoryTutorial.id,
          data: payload,
        });
      } else {
        createCategoryTutorial(payload);
      }
    },
    [createCategoryTutorial, updateCategoryTutorial, categoryTutorial?.id]
  );

  return (
    <Modal
      title={`${categoryTutorial ? 'Editar' : 'Nova'} Categoria`}
      onClose={onClose}
      {...props}
    >
      <CategoryTutorialForm
        defaultValues={categoryTutorial}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingCategoryTutorial || isUpdatingCategoryTutorial}
      />
    </Modal>
  );
}
