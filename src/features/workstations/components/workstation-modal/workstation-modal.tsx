import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { WorkstationForm } from '@/features/workstations/components/workstation-form';
import { Modal } from '@/components/modal';
import { usePostCreateWorkstation } from '@/features/workstations/api/post-create-workstation';
import { usePutUpdateWorkstation } from '@/features/workstations/api/put-update-workstation';
import { PostCreateWorkstationParams } from '@/features/workstations/api/types';

interface WorkstationModalProps extends Partial<ModalProps> {
  workstation?: Workstation;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkstationModal({
  workstation,
  onClose,
  ...props
}: WorkstationModalProps) {
  const { mutate: createWorkstation, isLoading: isCreatingWorkstation } =
    usePostCreateWorkstation({
      onSuccessCallBack: onClose,
    });

  const { mutate: updateWorkstation, isLoading: isUpdatingWorkstation } =
    usePutUpdateWorkstation({
      onSuccessCallBack: onClose,
    });

  const handleSubmit = useCallback(
    async ({
      name,
      city,
      gateway,
      ip,
      phone,
      is_regional,
      child_workstation,
      parent_workstation,
    }: WorkstationPayload) => {
      const childs = child_workstation?.map((workstationOption) => {
        return workstationOption.value;
      });

      const payload: PostCreateWorkstationParams = {
        name,
        city_id: city.value,
        gateway,
        ip,
        phone,
        is_regional,
        child_workstation_ids: is_regional ? childs : null,
        parent_workstation_id: is_regional ? null : parent_workstation?.value,
      };

      if (workstation?.id) {
        updateWorkstation({
          workstationId: workstation.id,
          data: { ...payload },
        });
      } else {
        createWorkstation(payload);
      }
    },
    [createWorkstation, updateWorkstation, workstation?.id]
  );

  return (
    <Modal
      title={`${workstation ? 'Editar' : 'Novo'} Posto de Trabalho`}
      onClose={onClose}
      {...props}
    >
      <WorkstationForm
        selectedWorkstation={workstation}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingWorkstation || isUpdatingWorkstation}
      />
    </Modal>
  );
}
