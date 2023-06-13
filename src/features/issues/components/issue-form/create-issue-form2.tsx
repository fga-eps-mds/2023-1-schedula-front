import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  InputLeftElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsPersonCircle, BsTelephoneFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { ControlledSelect } from '@/components/form-fields';
import { Input } from '@/components/form-fields/input';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { usePostCreateIssueOpen } from '@/features/issues/api/post-create-issue-open';
import {
  IssueOpen,
  IssuePayloadOpen,
  PostCreateIssueParamsOpen,
} from '@/features/issues/types';

import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { useGetAllProblemCategories } from '@/features/problem/api/get-all-problem-category';
import { maskPhoneField } from '@/utils/form-utils';
import { useAuth } from '@/contexts/AuthContext';
import { ScheduleModal } from '@/features/schedules/components/schedule-modal';

interface Option {
  label: string;
  value: string;
}

export function CreateIssueForm() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [createdIssue, setCreatedIssue] = useState<IssueOpen>();

  const cityRef = useRef<Option | null>(null);
  const categoryRef = useRef<Option | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<IssuePayloadOpen>();

  const { mutate: createIssue, isLoading: isCreatingIssue } =
    usePostCreateIssueOpen({
      onSuccessCallBack(data) {
        setCreatedIssue(data);
      },
    });

  const { data: cities, isLoading: isLoadingCities } = useGetAllCities(0);

  const { data: problem_categories, isLoading: isLoadingProblems } =
    useGetAllProblemCategories();

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

  const { data: phone, isLoading: isLoadingPhone } = useGetAllWorkstations();

  const citiesOptions = cities?.map((city) => {
    return {
      label: city?.name ?? '',
      value: city?.id ?? '',
    };
  });

  const problemCategoriesOptions = problem_categories?.map((category) => {
    return {
      label: category?.name ?? '',
      value: category?.id ?? '',
    };
  });

  const city = watch('city_payload');
  const category = watch('problem_category_payload');
  const problemTypes = watch('problem_types_payload');

  const workstationsOptions = city
    ? workstations
        ?.filter((workstation) => workstation.city.id === city.value)
        .map((workstation) => ({
          value: workstation?.id ?? '',
          label: workstation?.name ?? '',
        }))
    : [];

  const workstationPayLoad = watch('workstation_payload');

  const phoneOptions = workstationPayLoad
    ? workstations

        ?.filter((workstation) => workstation.id === workstationPayLoad.value)
        .map((workstation) => ({
          value: workstation?.phone ?? '',
          label: workstation?.phone ?? '',
        }))
    : [];

  const problemTypesOptions = category
    ? problem_categories
        ?.filter((cat) => cat.id === category.value)
        .map((category) => category.problem_types)[0]
        .map((problemType) => ({
          value: problemType?.id ?? '',
          label: problemType?.name ?? '',
        }))
    : [];

  useEffect(() => {
    if (city !== cityRef.current) {
      resetField('workstation_payload', { defaultValue: null });
      cityRef.current = city;
    }
  }, [city, resetField]);

  useEffect(() => {
    if (category !== categoryRef.current) {
      resetField('problem_types_payload', { defaultValue: null });
      categoryRef.current = category;
    }
  }, [category, resetField]);

  const onSubmit = useCallback(
    ({
      city_payload,
      phone,
      cellphone,
      email,
      problem_category_payload,
      problem_types_payload,
      requester,
      workstation_payload,
      description,
    }: IssuePayloadOpen) => {
      const payload: PostCreateIssueParamsOpen = {
        requester,
        phone: phone?.value,
        cellphone,
        email,
        city_id: city_payload?.value,
        date: new Date().toISOString(),
        problem_category_id: problem_category_payload?.value,
        problem_types_ids:
          problem_types_payload?.map((type) => type?.value) ?? [],
        workstation_id: workstation_payload?.value,
        description,
      };

      createIssue(payload);
    },
    [createIssue]
  );

  return (
    <>
      <form id="create-issue-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <Input
            label="Solicitante"
            {...register('requester', {
              required: 'Campo obrigatório',
            })}
            errors={errors?.requester}
            placeholder="Nome do solicitante"
            leftElement={
              <InputLeftElement>
                <Icon as={BsPersonCircle} fontSize={20} />
              </InputLeftElement>
            }
          />

          <Controller
            control={control}
            name="cellphone"
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
                label="Celular"
                placeholder="(00) 0000-0000"
                value={value}
                errors={error}
                onChange={(e) => onChange(maskPhoneField(e.target.value))}
                leftElement={
                  <InputLeftElement>
                    <Icon as={BsTelephoneFill} fontSize={20} />
                  </InputLeftElement>
                }
              />
            )}
          />
          <Input
            label="Email"
            {...register('email', {
              required: 'Campo obrigatório',
            })}
            errors={errors?.email}
            placeholder="Email do solicitante"
            leftElement={
              <InputLeftElement>
                <Icon as={MdEmail} fontSize={20} />
              </InputLeftElement>
            }
          />

          <ControlledSelect
            control={control}
            name="city_payload"
            id="city_payload"
            options={citiesOptions}
            isLoading={isLoadingCities}
            placeholder="Cidade"
            label="Cidade"
            rules={{ required: 'Campo obrigatório' }}
          />

          <ControlledSelect
            control={control}
            name="workstation_payload"
            id="workstation_payload"
            options={workstationsOptions}
            isLoading={isLoadingWorkstations}
            placeholder="Posto de Trabalho"
            label="Posto de Trabalho"
            rules={{ required: 'Campo obrigatório' }}
          />

          <ControlledSelect
            control={control}
            name="phone"
            id="phone"
            options={phoneOptions}
            isLoading={isLoadingPhone}
            placeholder="(00) 0000-0000"
            label="Telefone"
            rules={{ required: 'Campo obrigatório' }}
          />

          <ControlledSelect
            control={control}
            name="problem_category_payload"
            id="problem_category_payload"
            options={problemCategoriesOptions}
            isLoading={isLoadingProblems}
            placeholder="Categoria do Problema"
            label="Categoria do Problema"
            rules={{
              shouldUnregister: true,
            }}
          />

          <ControlledSelect
            control={control}
            isMulti
            name="problem_types_payload"
            id="problem_types_payload"
            options={problemTypesOptions}
            isLoading={isLoadingWorkstations}
            placeholder="Tipos de Problema"
            label="Tipos de Problema"
            rules={{
              shouldUnregister: true,
            }}
          />

          <GridItem colSpan={2} display="center" justifyContent="center">
            <Input
              // height={150}
              label="Descrição do Problema"
              {...register('description', {
                required: 'Campo obrigatório',
              })}
              errors={errors?.requester}
              placeholder="Descrição do Problema"
            />
          </GridItem>
        </Grid>

        {problemTypes && problemTypes?.length > 0 ? (
          <Box shadow="lg" mt="2rem" borderRadius=".5rem">
            <Box bg="#ffdab7" p="1rem" borderRadius=".5rem">
              <Text fontWeight="bold">Rol de atendimento</Text>
            </Box>
            {problemTypes?.map((problem) => (
              <Box key={problem.value} my="1rem" px="1rem" pt=".5rem" pb="1rem">
                <Text>
                  {category.label} - {problem.label}
                </Text>
              </Box>
            ))}
          </Box>
        ) : null}

        <Button
          type="submit"
          form="create-issue-form"
          width="100%"
          size="lg"
          mt={8}
          boxShadow="xl"
          isLoading={isCreatingIssue}
          {...(createdIssue && {
            onClick: () => navigate('/chamados'),
            bg: 'transparent',
            border: '1px solid #F49320',
            color: '#F49320',
          })}
        >
          {!createdIssue ? 'Registrar Agendamento' : 'Ir para os agendamentos'}
        </Button>
      </form>

      <ScheduleModal issue={createdIssue} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
