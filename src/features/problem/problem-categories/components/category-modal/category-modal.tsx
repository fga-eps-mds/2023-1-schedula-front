import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { usePostCreateProblemCategory } from '@/features/problem/api/post-create-problem-category';
import { usePutUpdateProblemCategory } from '@/features/problem/api/put-update-problem-category';
import { CategoriaForm } from '@/features/problem/problem-categories/components/categoria-form';

interface CategoryModalProps extends Partial<ModalProps> {
  category?: Category | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryModal({
  onClose,
  category,
  ...props
}: CategoryModalProps) {
  const {
    mutate: createProblemCategory,
    isLoading: isCreatingProblemCategory,
  } = usePostCreateProblemCategory({});

  const {
    mutate: updateProblemCategory,
    isLoading: isUpdatingProblemCategory,
  } = usePutUpdateProblemCategory({});

  const handleSubmit = useCallback(
    ({ name, description, visible_user_external }: CategoryPayload) => {
      if (category?.id) {
        updateProblemCategory({
          id: category.id,
          data: {
            name,
            description,
            visible_user_external,
          },
        });
      } else {
        createProblemCategory({
          name,
          description,
          visible_user_external,
        });
      }

      onClose?.();
    },
    [createProblemCategory, updateProblemCategory, category?.id, onClose]
  );

  return (
    <Modal
      title={`${category ? 'Editar' : 'Nova'} Categoria`}
      onClose={onClose}
      {...props}
    >
      <CategoriaForm
        defaultValues={category}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingProblemCategory || isUpdatingProblemCategory}
      />
    </Modal>
  );
}
