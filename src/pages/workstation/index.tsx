import {
  Box,
  Button,
  Checkbox,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { WorkstationModal } from '@/features/workstations/components/workstation-modal/workstation-modal';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { useDeleteWorkstation } from '@/features/workstations/api/delete-workstation';
import { WorkstationItem } from '@/features/workstations/components/workstation-item';
import { DeleteWorkstationModal } from '@/features/workstations/components/workstation-modal/delete-workstation-modal';
import { DeleteWorkstationProps } from '@/features/workstations/types';

export function Workstation() {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [filter, setFilter] = useState('');
  const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation>();

  const { data: workstations, isLoading, refetch } = useGetAllWorkstations();

  const filteredWorkstations =
    filter === 'regional'
      ? workstations?.filter((workstation) => workstation.is_regional)
      : workstations;

  const {
    mutate: deleteRegionalWorkstation,
    isLoading: isDeletingRegionalWorkstation,
  } = useDeleteWorkstation({ onSuccessCallBack: onCloseDelete });

  const onSubmitRegionalDelete = (values: DeleteWorkstationProps) => {
    if (values) {
      const formattedData = values.reallocatedWorkstations.map((item) => ({
        destinationId: item.destination.value,
        reallocatedId: item.id,
      }));

      deleteRegionalWorkstation({
        workstationId: selectedWorkstation?.id ?? '',
        data: formattedData,
      });

      setSelectedWorkstation(undefined);
    }
  };

  const onEdit = useCallback(
    (workstation: Workstation) => {
      setSelectedWorkstation(workstation);
      onOpenEdit();
    },
    [onOpenEdit]
  );

  const onDelete = useCallback(
    (workstation: Workstation) => {
      setSelectedWorkstation(workstation);
      onOpenDelete();
    },
    [onOpenDelete]
  );

  const handleClose = useCallback(() => {
    setSelectedWorkstation(undefined);
    onCloseEdit();
  }, [onCloseEdit]);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedWorkstation(undefined);
    onCloseDelete();
  }, [onCloseDelete]);

  const renderWorkstationItem = useCallback(
    (work: Workstation) => (
      <WorkstationItem
        workstation={work}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeletingRegionalWorkstation={isDeletingRegionalWorkstation}
      />
    ),
    [onDelete, onEdit, isDeletingRegionalWorkstation]
  );

  return (
    <>
      <PageHeader title="Gerenciar Postos de Trabalho">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Button onClick={onOpenEdit}>Novo Posto de Trabalho</Button>
        </HStack>
      </PageHeader>

      <VStack align="stretch" spacing={6}>
        <Box width="50%" minWidth="300px">
          <Checkbox
            size="md"
            colorScheme="orange"
            onChange={(e) => setFilter(e.target.checked ? 'regional' : '')}
          >
            Regionais
          </Checkbox>
        </Box>

        <ListView<Workstation>
          items={filteredWorkstations}
          render={renderWorkstationItem}
          isLoading={isLoading}
        />
      </VStack>

      <WorkstationModal
        isOpen={isOpenEdit}
        onClose={handleClose}
        workstation={selectedWorkstation}
      />

      <DeleteWorkstationModal
        isOpen={isOpenDelete}
        onClose={handleCloseDeleteModal}
        workstation={selectedWorkstation}
        onSubmit={onSubmitRegionalDelete}
        isDeletingWorkstation={isDeletingRegionalWorkstation}
      />
    </>
  );
}
