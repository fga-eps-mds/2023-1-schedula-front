import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { DeleteWorkstationForm } from '@/features/workstations/components/workstation-form/delete-workstation-form';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { useDeleteWorkstation } from '@/features/workstations/api/delete-workstation';
import { DeleteWorkstationProps } from '@/features/workstations/types';

interface DeleteWorkstationModalProps extends Partial<ModalProps> {
  workstation?: Workstation;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteWorkstationModal({
  workstation,
  onClose,
  ...props
}: DeleteWorkstationModalProps) {
  const { data: workstations } = useGetAllWorkstations();
  const workstationsToRealloc = workstation?.child_workstations?.map(
    (workstation) => ({
      name: workstation.name,
      id: workstation.id,
      destination: '',
    })
  );

  const { mutate: deleteWorkstation, isLoading: isDeletingWorkstation } =
    useDeleteWorkstation({
      onSuccessCallBack: onClose,
    });

  const onSubmit = (values: DeleteWorkstationProps) => {
    deleteWorkstation({
      workstationId: workstation?.id ?? '',
      data: values.reallocatedWorkstations,
    });
  };

  const parentWorkstations = workstations
    ?.filter((workstation) => workstation.is_regional)
    .map((workstation) => ({
      name: workstation.name,
      value: workstation.id,
    }));

  return (
    <Modal
      title={`${workstation ? 'Editar' : 'Novo'} Posto de Trabalho`}
      onClose={onClose}
      {...props}
    >
      <DeleteWorkstationForm
        defaultValues={workstationsToRealloc}
        isSubmitting={isDeletingWorkstation}
        workstations={parentWorkstations}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
