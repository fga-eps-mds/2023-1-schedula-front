import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Grid, GridItem, HStack } from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';
import { getSelectOptions } from '@/utils/form-utils';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';

interface WorkstationFormProps {
  defaultValues?: Workstation;
  isRegional: boolean;
  onSubmit: (data: WorkstationPayload) => void;
  isSubmitting: boolean;
}

export function WorkstationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  isRegional,
}: WorkstationFormProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const [isRegionalState, setIsRegionalState] = useState(isRegional);

  const handleSelect = useCallback(() => {
    setIsRegionalState(!isRegionalState);
  }, [isRegionalState]);

  const { data: cidades, isLoading: isLoadingCidades } = useGetAllCities();

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

  const parent_workstations = workstations?.filter((work) => work.is_regional);

  const child_workstations = workstations?.filter(
    (work) => !work.is_regional && !work.parent_workstation
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkstationPayload>({
    defaultValues: {
      ...defaultValues,
      is_regional: isRegionalState,
    },
  });

  const defaultChildWorkstations = defaultValues?.child_workstations?.map(
    (workstation) => ({
      value: workstation.id,
      label: workstation.name,
    })
  );

  const defaultParentWorkstation = (workstation: Workstation | undefined) => {
    return {
      label: workstation?.name ?? '',
      value: workstation?.id ?? '',
    };
  };

  const defaultWorkstationCity = (city: City | undefined) => {
    return {
      label: city?.name ?? '',
      value: city?.id ?? '',
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome"
        {...register('name', { required: 'Campo obrigatório' })}
        errors={errors?.name}
        placeholder="Nome"
      />

      <Checkbox
        size="md"
        width="full"
        marginY="5"
        colorScheme="green"
        onChange={handleSelect}
        checked={isRegionalState}
        isChecked={isRegionalState}
      >
        Regional
      </Checkbox>

      <Grid templateColumns="1fr 1fr" gap={6}>
        <Input
          label="Telefone"
          {...register('phone', { required: 'Campo obrigatórtio' })}
          errors={errors?.phone}
          placeholder="Telefone"
        />

        <Input
          label="IP"
          {...register('ip', { required: 'Campo obrigatórtio' })}
          errors={errors?.ip}
          placeholder="IP"
        />

        <Input
          label="Gateway"
          {...register('gateway', { required: 'Campo obrigatórtio' })}
          errors={errors?.gateway}
          placeholder="Gateway"
        />

        <ControlledSelect
          control={control}
          name="city_payload"
          id="city_id"
          options={getSelectOptions(cidades, 'name', 'id')}
          isLoading={isLoadingCidades}
          placeholder="Cidade"
          label="Cidade"
          defaultValue={defaultWorkstationCity(defaultValues?.city)}
          rules={{ required: 'Campo obrigatório' }}
        />

        <GridItem colSpan={2}>
          <ControlledSelect
            control={control}
            name="parent_workstation_payload"
            id="parent_workstation_payload"
            options={getSelectOptions(parent_workstations, 'name', 'id')}
            isLoading={isLoadingWorkstations}
            placeholder="Regional"
            label="Regional"
            isDisabled={isRegionalState}
            defaultValue={defaultParentWorkstation(
              defaultValues?.parent_workstation
            )}
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <ControlledSelect
            control={control}
            isMulti
            name="child_workstation_payload"
            id="child_workstation_payload"
            options={getSelectOptions(child_workstations, 'name', 'id')}
            isLoading={isLoadingWorkstations}
            placeholder="Postos Agregados"
            label="Postos Agregados"
            isDisabled={!isRegionalState}
            defaultValue={defaultChildWorkstations}
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            {isEditing ? 'Salvar' : 'Criar Posto de Trabalho'}
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
