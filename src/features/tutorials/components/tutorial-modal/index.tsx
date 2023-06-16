import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { TutorialForm } from '../tutorial-form';
import { Tutorial, TutorialPayload } from '../../type';
import { usePostCreateTutorial } from '../../api/post-create-tutorial';
import { usePutUpdateTutorial } from '../../api/put-update-tutorials';
import { PostCreateTutorialParams } from '../../api/types';
import { toast } from '@/utils/toast';

interface TutorialModalProps extends Partial<ModalProps> {
  tutorial?: Tutorial;
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialModal({
  onClose,
  tutorial,
  ...props
}: TutorialModalProps) {
  const { mutate: createTutorial, isLoading: isCreatingTutorial } =
    usePostCreateTutorial({
      onSuccessCallBack: onClose,
    });
  const { mutate: updateTutorial, isLoading: isUpdatingTutorial } =
    usePutUpdateTutorial({
      onSuccessCallBack: onClose,
    });

  const handleSubmit = useCallback(
    async ({ name, category_id, file }: TutorialPayload) => {
      if (!name || !category_id) {
        return;
      }
      const payload: PostCreateTutorialParams = {
        name,
        category_id,
        file,
      };
      if (tutorial?.id && tutorial !== undefined) {
        updateTutorial({
          tutorialId: tutorial.id,
          data: payload,
        });
      } else if (payload?.category_id.value === '') {
        toast.error(
          'Escolha uma categoria para poder cadastrar um novo tutorial',
          'Campo categoria é obrigatório.'
        );
      } else {
        createTutorial(payload);
      }
    },
    [createTutorial, updateTutorial, tutorial]
  );

  return (
    <Modal
      title={`${tutorial ? 'Editar' : 'Criar'} Tutorial`}
      size="2xl"
      onClose={onClose}
      {...props}
    >
      <TutorialForm
        defaultValues={tutorial}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingTutorial || isUpdatingTutorial}
        editTutorial={tutorial}
      />
    </Modal>
  );
}
