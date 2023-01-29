import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Grid, GridItem } from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';
import {
  getSelectOptions,
  ipPatternRegex,
  maskPhoneField,
} from '@/utils/form-utils';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';

interface WorkstationFormProps {
  selectedWorkstation?: Workstation;
  onSubmit: (data: WorkstationPayload) => void;
  isSubmitting: boolean;
}

export function WorkstationForm({
  selectedWorkstation,
  onSubmit,
  isSubmitting,
}: WorkstationFormProps) {
  const isEditing = useMemo(
    () => Boolean(selectedWorkstation),
    [selectedWorkstation]
  );

  const { data: cidades, isLoading: isLoadingCidades } = useGetAllCities();

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

  const parent_workstations = workstations?.filter((work) => work.is_regional);

  const child_workstations = workstations
    ?.filter((work) => !work.is_regional && !work.parent_workstation)
    .filter((workstation) => workstation.id !== selectedWorkstation?.id);

  const child_workstations_options = getSelectOptions(
    child_workstations,
    'name',
    'id'
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorkstationPayload>({
    defaultValues: {
      name: selectedWorkstation?.name ?? '',
      child_workstation: selectedWorkstation?.child_workstations?.map(
        (workstation) => ({
          label: workstation.name,
          value: workstation.id,
        })
      ),
      city: {
        label: selectedWorkstation?.city?.name ?? '',
        value: selectedWorkstation?.city?.id ?? '',
      },
      gateway: selectedWorkstation?.gateway ?? '',
      ip: selectedWorkstation?.ip ?? '',
      parent_workstation: {
        label: selectedWorkstation?.parent_workstation?.name ?? '',
        value: selectedWorkstation?.parent_workstation?.id ?? '',
      },
      phone: selectedWorkstation?.phone ?? '',
      is_regional: selectedWorkstation?.is_regional ?? false,
    },
  });

  const isRegional = watch('is_regional');

  const defaultChildWorkstations = selectedWorkstation?.child_workstations?.map(
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

      <Controller
        control={control}
        name="is_regional"
        render={({ field: { value, onChange } }) => (
          <Checkbox
            size="md"
            width="full"
            marginY="5"
            colorScheme="orange"
            onChange={onChange}
            checked={value}
            isChecked={value}
          >
            Regional
          </Checkbox>
        )}
      />

      <Grid templateColumns="1fr 1fr" gap={6}>
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          rules={{
            required: 'Campo obrigatório',
            maxLength: {
              value: 15,
              message: 'Número inválido',
            },
          }}
          render={({
            field: { ref, value, onChange },
            fieldState: { error },
          }) => (
            <Input
              ref={ref}
              label="Telefone"
              value={value}
              errors={error}
              placeholder="Telefone"
              onChange={(e) => onChange(maskPhoneField(e.target.value))}
            />
          )}
        />

        <Controller
          control={control}
          name="ip"
          defaultValue=""
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              value: ipPatternRegex,
              message: 'IP inválido',
            },
          }}
          render={({
            field: { ref, value, onChange },
            fieldState: { error },
          }) => (
            <Input
              ref={ref}
              label="IP"
              errors={error}
              value={value}
              placeholder="IP"
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />

        <Input
          label="Gateway"
          {...register('gateway', { required: 'Campo obrigatórtio' })}
          errors={errors?.gateway}
          placeholder="Gateway"
        />

        <ControlledSelect
          control={control}
          name="city"
          id="city"
          options={getSelectOptions(cidades, 'name', 'id')}
          isLoading={isLoadingCidades}
          placeholder="Cidade"
          label="Cidade"
          defaultValue={defaultWorkstationCity(selectedWorkstation?.city)}
          rules={{ required: 'Campo obrigatório' }}
        />

        {!isRegional ? (
          <GridItem colSpan={2}>
            <ControlledSelect
              control={control}
              name="parent_workstation"
              id="parent_workstation"
              options={getSelectOptions(parent_workstations, 'name', 'id')}
              isLoading={isLoadingWorkstations}
              placeholder="Regional"
              label="Regional"
              isDisabled={isRegional}
              defaultValue={defaultParentWorkstation(
                selectedWorkstation?.parent_workstation
              )}
              rules={{
                shouldUnregister: true,
              }}
            />
          </GridItem>
        ) : null}

        {isRegional ? (
          <GridItem colSpan={2}>
            <ControlledSelect
              control={control}
              isMulti
              name="child_workstation"
              id="child_workstation"
              options={child_workstations_options}
              isLoading={isLoadingWorkstations}
              placeholder="Postos Agregados"
              label="Postos Agregados"
              isDisabled={!isRegional}
              defaultValue={defaultChildWorkstations}
              rules={{
                shouldUnregister: true,
              }}
            />
          </GridItem>
        ) : null}

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            {isEditing ? 'Salvar' : 'Criar Posto de Trabalho'}
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
