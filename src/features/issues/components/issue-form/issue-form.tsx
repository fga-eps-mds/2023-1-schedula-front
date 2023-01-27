import { useForm } from 'react-hook-form';
import { Button, Grid, GridItem } from '@chakra-ui/react';
import { ControlledSelect, Datepicker, Input } from '@/components/form-fields';
import { getSelectOptions } from '@/utils/form-utils';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { Issue, IssuePayload } from '@/features/issues/types';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { useGetAllProblemCategories } from '@/features/problem-categories/api/get-all-problem-category';

interface IssueFormProps {
  issue?: Issue;
  onSubmit: (data: IssuePayload) => void;
  isSubmitting: boolean;
}

export function IssueForm({ issue, onSubmit, isSubmitting }: IssueFormProps) {
  const { data: cities, isLoading: isLoadingCities } = useGetAllCities();

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

  const { data: problem_categories, isLoading: isLoadingProblems } =
    useGetAllProblemCategories();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuePayload>({
    defaultValues: { ...issue },
  });

  const defaultWorkstation = (workstation_id: string | undefined) => {
    const issueWorkstation = workstations?.find(
      (workstation) => workstation.id === workstation_id
    );
    return {
      label: issueWorkstation?.name ?? '',
      value: issueWorkstation?.id ?? '',
    };
  };

  const workstationsOptions = workstations?.map((workstation) => ({
    value: workstation?.id ?? '',
    label: workstation?.name ?? '',
  }));

  const citiesOptions = cities?.map((city) => {
    return {
      label: city?.name ?? '',
      value: city?.id ?? '',
    };
  });

  const defaultIssueCity = (city_id: string | undefined) => {
    const issueCity = cities?.find((city) => city.id === city_id);
    return {
      label: issueCity?.name ?? '',
      value: issueCity?.id ?? '',
    };
  };

  const problemCategorieOptions = problem_categories?.map((category) => {
    return {
      label: category?.name ?? '',
      value: category?.id ?? '',
    };
  });

  const defaultProblemCategory = (problem_id: string | undefined) => {
    const problem = problem_categories?.find(
      (category) => category.id === issue?.problem_category.id
    );
    return {
      label: problem?.name ?? '',
      value: problem?.id ?? '',
    };
  };

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

  const defaultProblemTypes = issue?.problem_types?.map((type) => {
    return {
      label: type?.name,
      value: type?.id,
    };
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Input
          label="Solicitante"
          {...register('requester', { required: 'Campo obrigatório' })}
          errors={errors?.requester}
          placeholder="Solicitante"
        />
        <Input
          label="Telefone"
          {...register('phone', { required: 'Campo obrigatórtio' })}
          errors={errors?.phone}
          placeholder="Telefone"
        />

        <Datepicker
          control={control}
          name="date"
          id="date"
          label="Data"
          rules={{ required: 'Campo obrigatório' }}
          defaultValue={new Date()}
        />

        <ControlledSelect
          control={control}
          name="city_payload"
          id="city_id"
          options={getSelectOptions(citiesOptions, 'name', 'id')}
          isLoading={isLoadingCities}
          placeholder="Cidade"
          label="Cidade"
          defaultValue={defaultIssueCity(issue?.city_id)}
          rules={{ shouldUnregister: true }}
        />

        <GridItem colSpan={2}>
          <ControlledSelect
            control={control}
            name="workstation_payload"
            id="workstation_payload"
            options={getSelectOptions(workstationsOptions, 'name', 'id')}
            isLoading={isLoadingWorkstations}
            placeholder="Posto de Trabalho"
            label="Posto de Trabalho"
            defaultValue={defaultWorkstation(issue?.workstation_id)}
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <ControlledSelect
            control={control}
            name="problem_category_payload"
            id="problem_category_payload"
            options={getSelectOptions(problemCategorieOptions, 'name', 'id')}
            isLoading={isLoadingProblems}
            placeholder="Categoria do Problema"
            label="Categoria do Problema"
            defaultValue={defaultProblemCategory(issue?.problem_category?.id)}
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>

        <GridItem colSpan={2}>
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
            defaultValue={defaultProblemTypes}
            rules={{
              shouldUnregister: true,
            }}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            Salvar
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
