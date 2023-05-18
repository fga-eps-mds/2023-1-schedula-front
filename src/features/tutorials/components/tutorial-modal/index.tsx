import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';

import { TutorialForm } from '../tutorial-form/indext';
import { Tutorial, TutorialPayload } from '../../type';
import { usePostCreateTutorial } from '../../api/post-create-tutorial';
import { usePutUpdateTutorial } from '../../api/put-update-tutorials';
import { PostCreateTutorialParams } from '../../api/types';

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
      const payload: PostCreateTutorialParams = {
        name,
        category_id,
        file,
      };
      console.log('payload', payload);
      if (tutorial?.id) {
        updateTutorial({
          tutorialId: tutorial.id,
          data: payload,
        });
      } else {
        createTutorial(payload);
      }
    },
    [createTutorial, updateTutorial, tutorial?.id]
  );

  return (
    <Modal size="2xl" title="Criar tutorial" onClose={onClose} {...props}>
      <TutorialForm
        defaultValues={tutorial}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingTutorial || isUpdatingTutorial}
      />
    </Modal>
  );
}
