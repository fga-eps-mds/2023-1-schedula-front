import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { DeleteWorkstationForm } from '@/features/workstations/components/workstation-form/delete-workstation-form';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { DeleteWorkstationProps } from '@/features/workstations/types';

interface DeleteWorkstationModalProps extends Partial<ModalProps> {
  workstation?: Workstation;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DeleteWorkstationProps) => void;
  isDeletingWorkstation: boolean;
}

export function DeleteWorkstationModal({
  workstation,
  onClose,
  isOpen,
  onSubmit,
  isDeletingWorkstation,
  ...props
}: DeleteWorkstationModalProps) {
  const { data: workstations } = useGetAllWorkstations();

  const workstationsToRealloc = workstation?.child_workstations?.map(
    (workstation) => ({
      name: workstation.name,
      id: workstation.id,
      destination: {
        label: '',
        value: '',
      },
    })
  );

  const parentWorkstations = workstations
    ?.filter((workstation) => workstation.is_regional)
    .filter((i) => i.id !== workstation?.id)
    .map((workstation) => ({
      name: workstation.name,
      value: workstation.id,
    }));

  return (
    <Modal
      isOpen={isOpen}
      title="Deletar Regional"
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
