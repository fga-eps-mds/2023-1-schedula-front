import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';

import {
  ProblemType,
  ProblemTypePayload,
} from '@/features/problem/problem-types/types';
import { ProblemForm } from '@/features/problem/problem-types/components/problem-type-form';
import { usePostCreateProblemType } from '@/features/problem/problem-types/api/post-create-problem-type';
import { usePutUpdateProblemType } from '@/features/problem/problem-types/api/put-update-problem-type';

interface ProblemModalProps extends Partial<ModalProps> {
  problemType?: ProblemType | undefined;
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ProblemTypeModal({
  onClose,
  problemType,
  categoryId,
  ...props
}: ProblemModalProps) {
  const { mutate: createProblemType, isLoading: isCreatingProblemType } =
    usePostCreateProblemType({});
  const { mutate: updateProblemType, isLoading: isUpdatingProblemType } =
    usePutUpdateProblemType({});

  const handleSubmit = useCallback(
    async ({ name }: ProblemTypePayload) => {
      if (problemType) {
        updateProblemType({
          id: problemType.id,
          data: {
            name,
            problem_category_id: categoryId,
          },
        });
      } else {
        createProblemType({
          name,
          problem_category_id: categoryId,
        });
      }

      onClose?.();
    },
    [categoryId, createProblemType, updateProblemType, onClose, problemType]
  );

  return (
    <Modal
      title={`${problemType ? 'Editar' : 'Novo'} Tipo de Problema`}
      onClose={onClose}
      {...props}
    >
      <ProblemForm
        defaultValues={problemType}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingProblemType || isUpdatingProblemType}
      />
    </Modal>
  );
}
