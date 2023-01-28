import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form/dist/useFormContext';
import { BsPersonCircle, BsTelephoneFill } from 'react-icons/bs';
import InputMask from 'react-input-mask';
import { ControlledSelect } from '@/components/form-fields';
import { Input } from '@/components/form-fields/input';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { usePostCreateIssue } from '@/features/issues/api/post-create-issue';
import {
  Issue,
  IssuePayload,
  PostCreateIssueParams,
} from '@/features/issues/types';
import { useGetAllProblemCategories } from '@/features/problem-categories/api/get-all-problem-category';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { getSelectOptions } from '@/utils/form-utils';

export function CreateIssueForm() {
  const [issue, setIssue] = useState<Issue>();

  const { mutate: createIssue, isLoading: isUpdatingIssue } =
    usePostCreateIssue({
      onSuccessCallBack: () => {},
    });

  const { data: cities, isLoading: isLoadingCities } = useGetAllCities();

  const citiesOptions = cities?.map((city) => {
    return {
      label: city?.name ?? '',
      value: city?.id ?? '',
    };
  });

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

  const workstationsOptions = workstations?.map((workstation) => ({
    value: workstation?.id ?? '',
    label: workstation?.name ?? '',
  }));

  const { data: problem_categories, isLoading: isLoadingProblems } =
    useGetAllProblemCategories();

  const problemCategorieOptions = problem_categories?.map((category) => {
    return {
      label: category?.name ?? '',
      value: category?.id ?? '',
    };
  });

  const problemTypesOptions = (problem_id: string | undefined) => {
    const problem_category = problem_categories?.find(
      (category) => category.id === issue?.problem_category.id
    );
    return problem_category?.problem_types?.map((type) => {
      return {
        label: type?.name ?? '',
        value: type?.id ?? '',
      };
    });
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuePayload>({
    defaultValues: { ...issue },
  });

  const onSubmit = useCallback(
    async ({
      city_payload,
      date,
      email,
      phone,
      problem_category_payload,
      problem_types_payload,
      requester,
      workstation_payload,
    }: IssuePayload) => {
      const payload: PostCreateIssueParams = {
        requester,
        phone,
        city_id: city_payload?.value,
        date,
        email,
        problem_category_id: problem_category_payload?.value,
        problem_types_ids: problem_types_payload?.map((type) => type?.value),
        workstation_id: workstation_payload?.value,
      };

      createIssue({
        requester,
        phone,
        city_id: city_payload?.value,
        date,
        email,
        problem_category_id: problem_category_payload?.value,
        problem_types_ids: problem_types_payload?.map((type) => type?.value),
        workstation_id: workstation_payload?.value,
      });
    },
    [createIssue]
  );
  return (
    <form id="create-issue-form" onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <Input
          label="Solicitante"
          {...register('requester', {
            required: 'Campo obrigatório',
          })}
          errors={errors?.requester}
          leftElement={
            <InputLeftElement>
              <Icon as={BsPersonCircle} fontSize={20} />
            </InputLeftElement>
          }
        />

        <Input
          label="Telefone"
          placeholder="0000-0000"
          {...register('phone', {
            required: 'Campo obrigatório',
          })}
          errors={errors?.phone}
          leftElement={
            <InputLeftElement>
              <Icon as={BsTelephoneFill} fontSize={20} />
            </InputLeftElement>
          }
        />

        <ControlledSelect
          control={control}
          name="city_payload"
          id="city_payload"
          options={getSelectOptions(citiesOptions, 'name', 'id')}
          isLoading={isLoadingCities}
          placeholder="Cidade"
          label="Cidade"
          rules={{ required: 'Campo obrigatório' }}
        />

        <ControlledSelect
          control={control}
          name="workstation_payload"
          id="workstation_payload"
          options={getSelectOptions(workstationsOptions, 'name', 'id')}
          isLoading={isLoadingWorkstations}
          placeholder="Posto de Trabalho"
          label="Posto de Trabalho"
          rules={{ required: 'Campo obrigatório' }}
        />

        <GridItem colSpan={2}>
          <ControlledSelect
            control={control}
            name="problem_category_payload"
            id="problem_category_payload"
            options={getSelectOptions(problemCategorieOptions, 'name', 'id')}
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
            options={getSelectOptions(
              problemTypesOptions(issue?.problem_category?.id),
              'name',
              'id'
            )}
            isLoading={isLoadingWorkstations}
            placeholder="Tipos de Problema"
            label="Tipos de Problema"
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>
      </Grid>

      <Button
        type="submit"
        form="create-issue-form"
        width="100%"
        size="lg"
        mt={8}
        boxShadow="xl"
      >
        Finalizar
      </Button>
    </form>
  );
}
