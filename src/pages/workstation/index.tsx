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
// import { WorkstationsFilter } from '@/components/workstations-filter';
import { ListView } from '@/components/list';
import { WorkstationModal } from '@/features/workstations/components/workstation-modal/workstation-modal';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { useDeleteWorkstation } from '@/features/workstations/api/delete-workstation';
import { WorkstationItem } from '@/features/workstations/components/workstation-item';
import { DeleteWorkstationModal } from '@/features/workstations/components/workstation-modal/delete-workstation-modal';

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
  const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation>();

  const { data: workstations, isLoading, refetch } = useGetAllWorkstations();
  // const { filters, updateField } = useFilters(workstationFields);
  const { mutate: deleteCity, isLoading: isDeletingWorkstation } =
    useDeleteWorkstation({});

  const onEdit = useCallback(
    (work: Workstation) => {
      setSelectedWorkstation(work);
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

  const renderWorkstationItem = useCallback(
    (work: Workstation) => (
      <WorkstationItem
        workstation={work}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isDeletingWorkstation}
      />
    ),
    [onDelete, onEdit, isDeletingWorkstation]
  );
  // const {
  //   data: workstations,
  //   isLoading,
  //   isValidating,
  //   mutate,
  // } = useRequest<Workstation[]>(
  //   filters?.regional
  //     ? getWorkstations({
  //         params: {
  //           regional_id: (filters?.regional as unknown as SelectOption)?.value,
  //         },
  //       })
  //     : null,
  //   {
  //     revalidateIfStale: false,
  //   }
  // );

  // const refresh = useCallback(
  //   (data?: Workstation[]) =>
  //     mutate(
  //       {
  //         data: {
  //           error: null,
  //           message: '',
  //           data: data ?? [],
  //         },
  //       } as AxiosResponse<ApiResponse<Workstation[]>>,
  //       { revalidate: !data }
  //     ),
  //   [mutate]
  // );

  // const onDelete = useCallback(
  //   (result: Result<ApiResponse<null>>, { id }: Workstation) => {
  //     if (result.type === 'success') {
  //       toast.success(result.value?.message);

  //       const newWorkstations = workstations?.data.filter(
  //         (workstation) => workstation.id !== id
  //       );
  //       refresh(newWorkstations);

  //       return;
  //     }

  //     toast.error(result.error?.message);
  //   },
  //   [refresh, workstations?.data]
  // );

  // const onEdit = useCallback(
  //   (workstation: Workstation) => {
  //     setSelectedWorkstation(workstation);
  //     onOpen();
  //   },
  //   [onOpen]
  // );

  // const onSubmit = useCallback(
  //   (result: Result<ApiResponse<Workstation>>) => {
  //     if (result.type === 'error') {
  //       toast.error(result.error?.message);

  //       return;
  //     }

  //     toast.success(result.value?.message);

  //     const newWorkstations = selectedWorkstation
  //       ? workstations?.data.map((workstation) =>
  //           workstation.id === selectedWorkstation?.id
  //             ? result.value?.data
  //             : workstation
  //         )
  //       : [...(workstations?.data || []), result.value?.data];

  //     refresh(newWorkstations);
  //     setSelectedWorkstation(undefined);
  //     onClose();
  //   },
  //   [onClose, refresh, selectedWorkstation, workstations?.data]
  // );

  // const handleClose = useCallback(() => {
  //   setSelectedWorkstation(undefined);
  //   onClose();
  // }, [onClose]);

  // const renderWorkstationItem = useCallback(
  //   (item: Workstation) => (
  //     <WorkstationItem workstation={item} onEdit={onEdit} onDelete={onDelete} />
  //   ),
  //   [onDelete, onEdit]
  // );

  // const handleFilterChange = useCallback(
  //   (values: Filters) =>
  //     (
  //       Object.entries(values) as [
  //         keyof Filters,
  //         (typeof values)[keyof Filters]
  //       ][]
  //     ).forEach(([field, value]) => {
  //       updateField(field)(value);
  //     }),
  //   [updateField]
  // );

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
          <Checkbox size="md" colorScheme="green">
            Regionais
          </Checkbox>
        </Box>

        <ListView<Workstation>
          items={workstations}
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
        onClose={onCloseDelete}
        workstation={selectedWorkstation}
      />
    </>
  );
}
