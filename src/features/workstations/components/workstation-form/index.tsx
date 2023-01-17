import { useCallback, useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
} from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';
import { getSelectOptions } from '@/utils/form-utils';
import { ActionButton } from '@/components/action-buttons';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { useGetCitiesData } from '@/features/workstations/components/workstation-form/api/get-cities-data';
import { useGetWorkstationData } from '@/features/workstations/components/workstation-form/api/get-workstations-data';

export interface WorkstationFormProps {
  defaultValues?: Workstation | undefined;
  onSubmit: SubmitHandler<WorkstationFormValues>;
}

export type WorkstationFormValues = CreateWorkstationPayload & {
  phones: { number: string }[];
  city_id: SelectOption<number>;
  regional_id: SelectOption<number>;
};

export function WorkstationForm({
  defaultValues,
  onSubmit,
}: WorkstationFormProps) {
  const { data: cidades, isLoading: isLoadingCidades } = useGetCitiesData();

  const { data: regionais, isLoading: isLoadingRegionais } =
    useGetWorkstationData();

  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<WorkstationFormValues>({
    defaultValues: {
      ...defaultValues,
      phones: defaultValues?.phones?.map((phone) => ({ number: phone })),
    },
  });

  const isADSL = watch('adsl_vpn');
  const isRegional = watch('regional');

  useEffect(() => {
    // THIS A HACKY SOLUTION UNTIL BACKEND SENDS THE NAME OF THE CITY/WORKSTATION
    // Get workstation label from defaultValues and set it on the select
    if (defaultValues?.regional_id && regionais) {
      const label = regionais?.data.find(
        (regional: { id: number }) =>
          regional?.id === defaultValues?.regional_id
      )?.name;

      if (label)
        resetField('regional_id', {
          defaultValue: {
            value: defaultValues?.regional_id,
            label,
          },
        });
    }
  }, [defaultValues, regionais, resetField]);

  useEffect(() => {
    // THIS A HACKY SOLUTION UNTIL BACKEND SENDS THE NAME OF THE CITY/WORKSTATION
    // Get workstation label from defaultValues and set it on the select
    if (defaultValues?.city_id && cidades) {
      const label = cidades?.data.find(
        (city: { id: number }) => city?.id === defaultValues?.city_id
      )?.name;

      if (label)
        resetField('city_id', {
          defaultValue: {
            value: defaultValues?.city_id,
            label,
          },
        });
    }
  }, [cidades, defaultValues, resetField]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  const handleAddPhone = useCallback(() => {
    append({
      number: '',
    });
  }, [append]);

  const handleRemovePhone = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Input
          label="Nome"
          {...register('name', { required: 'Campo obrigatório' })}
          errors={errors?.name}
          placeholder="Nome"
        />

        <GridItem alignSelf="center">
          <HStack spacing={6}>
            <Checkbox {...register('regional')} size="lg" colorScheme="orange">
              Regional
            </Checkbox>
            <Checkbox {...register('adsl_vpn')} size="lg" colorScheme="orange">
              ADSL/VPN
            </Checkbox>
          </HStack>
        </GridItem>

        {!isADSL && (
          <>
            <Input
              label="Link"
              {...register('link', {
                required: 'Campo obrigatório',
                shouldUnregister: true,
              })}
              errors={errors?.link}
              placeholder="00.00.000.1"
            />

            <Input
              label="IP"
              {...register('ip', {
                required: 'Campo obrigatório',
                shouldUnregister: true,
              })}
              errors={errors?.ip}
              placeholder="00.000.00.2 a 00.00.000.3"
            />
          </>
        )}

        <ControlledSelect
          control={control}
          name="city_id"
          id="city_id"
          options={getSelectOptions(cidades?.data, 'name', 'id')}
          isLoading={isLoadingCidades}
          placeholder="Cidade"
          label="Cidade"
          rules={{ required: 'Campo obrigatório' }}
        />

        {!isRegional && (
          <ControlledSelect
            control={control}
            name="regional_id"
            id="regional_id"
            options={getSelectOptions(regionais?.data, 'name', 'id')}
            isLoading={isLoadingRegionais}
            placeholder="Regional"
            label="Regional"
            rules={{
              required: 'Campo obrigatório',
              shouldUnregister: true,
            }}
          />
        )}

        <GridItem colSpan={2}>
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
        </GridItem>

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            Registrar
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
