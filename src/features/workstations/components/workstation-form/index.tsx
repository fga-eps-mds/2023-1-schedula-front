import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, GridItem, HStack } from '@chakra-ui/react';
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

  const { data: cidades, isLoading: isLoadingCidades } = useGetAllCities();

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

  const parent_workstations = workstations?.filter(
    (work) => (work.child_workstations?.length ?? 0) > 0
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorkstationPayload>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Input
          label="Nome"
          {...register('name', { required: 'Campo obrigatório' })}
          errors={errors?.name}
          placeholder="Nome"
        />

        <Input
          label="Telefone"
          {...register('phone', { required: 'Campo obrigatórtio' })}
          errors={errors?.name}
          placeholder="Telefone"
        />

        <Input
          label="IP"
          {...register('ip', { required: 'Campo obrigatórtio' })}
          errors={errors?.name}
          placeholder="IP"
        />

        <Input
          label="Gateway"
          {...register('gateway', { required: 'Campo obrigatórtio' })}
          errors={errors?.name}
          placeholder="Gateway"
        />

        <GridItem alignSelf="center">
          <HStack spacing={6} />
        </GridItem>

        <ControlledSelect
          control={control}
          name="city_id"
          id="city_id"
          options={getSelectOptions(cidades, 'name', 'id')}
          isLoading={isLoadingCidades}
          placeholder="Cidade"
          label="Cidade"
          rules={{ required: 'Campo obrigatório' }}
        />

        <ControlledSelect
          control={control}
          name="parent_workstation_id"
          id="parent_workstation_id"
          options={getSelectOptions(parent_workstations, 'name', 'id')}
          isLoading={isLoadingWorkstations}
          placeholder="Regional"
          label="Regional"
          rules={{
            required: 'Campo obrigatório',
            shouldUnregister: true,
          }}
        />

        {/* <GridItem colSpan={2}>
          <Flex gap={2} alignItems="center">
            <ActionButton
              label="Adicionar Telefone"
              icon={<FaPlus />}
              onClick={handleAddPhone}
              variant="outline"
              color="primary"
              tooltipProps={{
                placement: 'bottom',
              }}
            />
            <Text>Telefones</Text>
          </Flex>
          <Divider mb={4} mt={1} />
          <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={6}>
            {fields?.map((phone, index) => {
              return (
                <Flex key={phone.id} gap={1}>
                  <Input
                    label={`Telefone ${index + 1}`}
                    {...register(`phones.${index}.number` as const, {
                      required: 'Campo obrigatório',
                    })}
                    errors={errors?.phones?.[index]?.number}
                  />
                  <DeleteButton
                    label={`Telefone ${index + 1}`}
                    onClick={handleRemovePhone(index)}
                    variant="ghost"
                    alignSelf="flex-end"
                    _hover={{
                      backgroundColor: 'blackAlpha.300',
                    }}
                  />
                </Flex>
              );
            })}
          </Grid>
        </GridItem> */}

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            {isEditing ? 'Salvar' : 'Criar Posto de Trabalho'}
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
