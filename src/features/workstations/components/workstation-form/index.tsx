import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Grid, GridItem, HStack } from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';
import { getSelectOptions } from '@/utils/form-utils';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';

interface WorkstationFormProps {
  defaultValues?: Workstation;
  onSubmit: (data: WorkstationPayload) => void;
  isSubmitting: boolean;
}

export function WorkstationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: WorkstationFormProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = useCallback(() => {
    setIsSelected(!isSelected);
  }, [isSelected]);

  const { data: cidades, isLoading: isLoadingCidades } = useGetAllCities();

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

  const parent_workstations = workstations?.filter((work) => work.is_regional);

  const child_workstations = workstations?.filter((work) => !work.is_regional);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkstationPayload>({
    defaultValues: {
      ...defaultValues,
      is_regional: defaultValues?.is_regional
        ? defaultValues.is_regional
        : !isSelected,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome"
        {...register('name', { required: 'Campo obrigatório' })}
        errors={errors?.name}
        placeholder="Nome"
      />

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
          rules={{ required: 'Campo obrigatório' }}
        />

        <ControlledSelect
          control={control}
          name="parent_workstation_payload"
          id="parent_workstation_payload"
          options={getSelectOptions(parent_workstations, 'name', 'id')}
          isLoading={isLoadingWorkstations}
          placeholder="Regional"
          label="Regional"
          isDisabled={isSelected}
          rules={{
            shouldUnregister: true,
          }}
        />

        <ControlledSelect
          control={control}
          isMulti
          name="child_workstation_payload"
          id="child_workstation_payload"
          options={getSelectOptions(child_workstations, 'name', 'id')}
          isLoading={isLoadingWorkstations}
          placeholder="Postos Agregados"
          label="Postos Agregados"
          isDisabled={!isSelected}
          rules={{
            shouldUnregister: true,
          }}
        />

        <Checkbox
          size="md"
          colorScheme="green"
          onChange={handleSelect}
          checked={isSelected}
        >
          Regional
        </Checkbox>

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            {isEditing ? 'Salvar' : 'Criar Posto de Trabalho'}
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
