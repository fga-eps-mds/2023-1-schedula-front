export {};
/*
 import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Grid, GridItem, HStack, Icon } from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';
import { getSelectOptions } from '@/utils/form-utils';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { FaPlus } from 'react-icons/fa';

interface WorkstationFormProps {
  defaultValues?: Workstation;
  onSubmit: (data: DeleteWorkstationPayload) => void;
  isSubmitting: boolean;
  workstations: Workstation[];
}

export function WorkstationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  workstations,
}: WorkstationFormProps) {
  const parent_workstations = workstations?.filter((work) => work.is_regional);

  const [workstationRealoc, setWorkstationRealoc] = useState([
    {
      workstation: { label: '', value: '' },
      workstationsToRealoc: [{ label: '', value: '' }],
    },
  ]);

  const handleChildSelect = useCallback(() => {
    setWorkstationRealoc(prevState => [
      ...prevState,
      workstationsRealoc: 
    ]);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteWorkstationPayload>({
    defaultValues: {
      workstationDeleteId: defaultValues?.id,
      workstationRealoc: workstationRealoc,
    },
  });

  const defaultChildWorkstations = defaultValues?.child_workstations?.map(
    (workstation) => ({
      value: workstation.id,
      label: workstation.name,
    })
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="1fr 1fr" gap={6}>
        <GridItem colSpan={2}>
          <ControlledSelect
            control={control}
            name="workstationsRealoc.0.workstation"
            id="workstationsRealoc.workstation"
            options={getSelectOptions(parent_workstations, 'name', 'id')}
            //isLoading={isLoadingWorkstations}
            placeholder="Regional"
            label="Regional"
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <ControlledSelect
            isMulti
            name="workstationsRealoc"
            id="workstationsRealoc"
            options={getSelectOptions(defaultChildWorkstations, 'name', 'id')}
            //isLoading={isLoadingWorkstations}
            placeholder="Postos Agregados"
            label="Postos Agregados"
            onChange={handleChildSelect}
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>

        <Button onClick={() => {}} variant="tertiary">
            <Icon as={FaPlus} mr={2} /> Chamado
        </Button>

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            Salvar
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
 */
