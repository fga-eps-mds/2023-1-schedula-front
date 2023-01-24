import { useCallback, useEffect, useMemo } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { BsPersonCircle, BsTelephoneFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  InputLeftElement,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

// import { useAuth } from '@contexts/AuthContext';
// import { useDropdownData } from '@/components/forms/chamado-form/hooks/useDropdownData';
import {
  chamadosDefaultValues,
  chamadoToFormValues,
  // getSelectOptions,
} from '@/utils/form-utils';
import { Input } from '@/components/form-fields';
import { EditButton } from '@/components/action-buttons/edit-button';
import { ChamadoForm } from '@/features/issues/components/issue-form';
// import { toast } from '@/utils/toast';
// import { WorkstationModal } from '@/components/modals/workstation-modal';

export interface ChamadoFormProps {
  onSubmit: SubmitHandler<ChamadoFormValues>;
  defaultValues?: Chamado;
}

export function ChamadoFormWrapper({
  onSubmit,
  defaultValues,
}: ChamadoFormProps) {
  const isEditing = Boolean(defaultValues);
  // const { user } = useAuth();
  const user = {
    name: 'CORRIGIR',
  };

  // const { isAuthorized: isEditWorkstationAuthorized } = useAuth([
  //   "manager"
  // ])
  const isEditWorkstationAuthorized = true;

  const {
    onOpen: openWorkstationModal,
    // isOpen: isWorkstationModalOpen,
    // onClose: closeWorkstationModal,
  } = useDisclosure();

  // const {
  //   cities,
  //   isLoadingCities,
  //   workstations,
  //   isLoadingWorkstations,
  //   isValidatingWorkstations,
  //   mutateWorkstations,
  // } = useDropdownData();

  const methods = useForm<ChamadoFormValues>({
    defaultValues: useMemo(
      () => ({
        ...chamadosDefaultValues,
        attendant_name: user?.name,
        ...(defaultValues && chamadoToFormValues(defaultValues)),
      }),
      [defaultValues, user?.name]
    ),
    mode: 'onChange',
  });

  const {
    register,
    // getValues,
    // setValue,
    watch,
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
    // getFieldState,
  } = methods;

  useEffect(() => {
    resetField('attendant_name', {
      defaultValue: user?.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore resetField
  }, [user]);

  useEffect(() => {
    // Register with validation, otherwise its possible to send form without 'problems' field
    register('problems', { required: 'Adicione um Chamado' });
  }, [register]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore reset
  }, [isSubmitSuccessful]);

  // const selectedWorkstation = watch('workstation_id');
  // useEffect(() => {
  //   if (!workstations || !selectedWorkstation) return;

  //   // User didn't set a phone, so we set the phone of the selected workstation
  //   if (
  //     !getFieldState('applicant_phone').isTouched ||
  //     !getValues('applicant_phone')
  //   )
  //     setValue(
  //       'applicant_phone',
  //       workstations?.data.find(
  //         (ws: Workstation) => ws.id === selectedWorkstation?.value
  //       )?.phones?.[0] || '',
  //       {
  //         shouldValidate: true,
  //       }
  //     );
  // }, [getFieldState, getValues, selectedWorkstation, setValue, workstations]);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'problems',
  });

  const handleAdd = useCallback(
    () => append(chamadosDefaultValues.problems[0]),
    [append]
  );

  const handleRemove = useCallback(
    // eslint-disable-next-line consistent-return
    (field: number) => {
      if (fields.length > 1)
        return () => {
          remove(field);
        };
    },
    [fields.length, remove]
  );

  // const handleWorkstationEdit = useCallback(
  //   (result: Result<ApiResponse<Workstation>>) => {
  //     if (result.type === 'success') {
  //       toast.success(result.value?.message);
  //       mutateWorkstations();
  //     } else toast.error(result.error?.message);

  //     closeWorkstationModal();
  //   },
  //   [closeWorkstationModal, mutateWorkstations]
  // );

  return (
    <>
      <FormProvider {...methods}>
        {/* Self-enclosing form to avoid nested forms submiting the main form */}
        <form id="chamado-form-wrapper" onSubmit={handleSubmit(onSubmit)} />
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <Input
            label="Solicitante"
            {...register('applicant_name', {
              required: 'Campo obrigatório',
            })}
            errors={errors?.applicant_name}
            leftElement={
              <InputLeftElement>
                <Icon as={BsPersonCircle} fontSize={20} />
              </InputLeftElement>
            }
          />

          <Input
            label="Telefone"
            as={InputMask}
            mask="9999-9999"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- maskChar is not in the lib types
            // @ts-ignore
            maskChar={null}
            placeholder="0000-0000"
            {...register('applicant_phone', {
              required: 'Campo obrigatório',
            })}
            errors={errors?.applicant_phone}
            leftElement={
              <InputLeftElement>
                <Icon as={BsTelephoneFill} fontSize={20} />
              </InputLeftElement>
            }
          />

          {/* <ControlledSelect
            control={control}
            name="city_id"
            id="city_id"
            options={getSelectOptions(cities?.data, 'name', 'id')}
            isLoading={isLoadingCities}
            placeholder="Cidade"
            label="Cidade"
            rules={{ required: 'Campo obrigatório' }}
          /> */}

          <GridItem position="relative">
            <EditButton
              label="Posto de Trabalho"
              onClick={openWorkstationModal}
              disabled={
                !watch('workstation_id') || !isEditWorkstationAuthorized
              }
              size="sm"
              variant="ghost"
              position="absolute"
              top={0}
              right={0}
              zIndex={5}
              tabIndex={-1}
            />
            {/* <ControlledSelect
              control={control}
              name="workstation_id"
              id="workstation_id"
              options={getSelectOptions(workstations?.data, 'name', 'id')}
              isLoading={isLoadingWorkstations || isValidatingWorkstations}
              placeholder="Posto de Trabalho"
              label="Posto de Trabalho"
              rules={{ required: 'Campo obrigatório' }}
            /> */}
          </GridItem>

          <GridItem colSpan={2}>
            <VStack align="stretch" spacing={8}>
              {(!fields || !fields.length) && (
                <Heading
                  as="h4"
                  textAlign="center"
                  fontWeight="semibold"
                  fontSize={errors?.problems ? '3xl' : '2xl'}
                  color={errors?.problems ? 'red' : 'gray.500'}
                >
                  Adicione um Chamado
                </Heading>
              )}

              {fields?.map((field, index) => (
                <fieldset key={field.id} disabled={isSubmitting}>
                  <ChamadoForm
                    index={index}
                    onRemove={handleRemove(index)}
                    onUpdate={update}
                    isEditing={isEditing}
                  />
                </fieldset>
              ))}

              {!isEditing && (
                <Flex justifyContent="end" mt={8}>
                  <Button onClick={handleAdd} variant="tertiary">
                    <Icon as={FaPlus} mr={2} /> Chamado
                  </Button>
                </Flex>
              )}
            </VStack>
          </GridItem>
        </Grid>

        <Button
          type="submit"
          form="chamado-form-wrapper"
          width="100%"
          size="lg"
          isDisabled={isSubmitting || !isDirty}
          isLoading={isSubmitting}
          mt={8}
          boxShadow="xl"
        >
          Finalizar {isEditing ? 'Edição' : 'Atendimento'}
        </Button>
      </FormProvider>

      {/* <WorkstationModal
        workstation={workstations?.data?.find(
          (station: { id: number }) =>
            station.id === getValues('workstation_id.value')
        )}
        isOpen={isWorkstationModalOpen}
        onClose={closeWorkstationModal}
        onSubmit={handleWorkstationEdit}
      /> */}
    </>
  );
}
