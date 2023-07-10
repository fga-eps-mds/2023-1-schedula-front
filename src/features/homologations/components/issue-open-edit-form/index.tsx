import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsPersonCircle, BsTelephoneFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { ControlledSelect } from '@/components/form-fields';
import { Input } from '@/components/form-fields/input';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { usePutUpdateExternIssue } from '@/features/homologations/api/put-edit-issues-open';
import {
  IssueOpen,
  IssuePayloadOpen,
  PutUpdateIssueParamsOpen,
} from '@/features/issues/types';
import { parseSelectedDatetime } from '@/utils/format-date';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { useGetAllProblemCategories } from '@/features/problem/api/get-all-problem-category';
import { maskPhoneField } from '@/utils/form-utils';

export function UpdateExternIssueForm() {
  const locate = useLocation();
  const { externIssue } = locate.state;

  const externIssueOpen = externIssue as IssueOpen;

  const { data: cities, isLoading: isLoadingCities } = useGetAllCities(0);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IssuePayloadOpen>({
    // define alguns valores padrão para os campos abaixo.
    defaultValues: {
      city_payload: {
        label: locate.state.city.name ?? '',
        value: locate.state.city.id ?? '',
      },
      workstation_payload: {
        label: locate.state.workstation.name ?? '',
        value: locate.state.workstation.id ?? '',
      },
      problem_category_payload: {
        label: locate.state.problem_category.name ?? '',
        value: locate.state.problem_category.id ?? '',
      },
      problem_types_payload:
        externIssue?.problem_types.map((type: { name: string; id: any }) => ({
          label: type.name,
          value: type.id,
        })) || [],
      alert_dates: externIssueOpen?.alerts.map((alert) => ({
        date: alert,
      })),
      dateTime: parseSelectedDatetime(locate.state.externIssue.dateTime) ?? '',
      phone: locate.state.externIssue.phone ?? '',
      ...locate.state.externIssue,
    },
  });

  const [selectedProblemTypes, setSelectedProblemTypes] = useState(
    locate.state.problem_types_payload
  );

  const { mutate: updateIssue, isLoading: isUpdatingIssue } =
    usePutUpdateExternIssue({
      onSuccessCallBack: () => {},
    });

  const { data: problem_categories, isLoading: isLoadingProblems } =
    useGetAllProblemCategories();

  const { data: workstations, isLoading: isLoadingWorkstations } =
    useGetAllWorkstations();

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

  // função que retorna os postos de trabalho de acordo com a cidade selecionada
  const workstationsOptions = city
    ? workstations
        ?.filter((workstation) => workstation.city.id === city.value)
        .map((workstation) => ({
          value: workstation?.id ?? '',
          label: workstation?.name ?? '',
        }))
    : [];

  // função que retorna os tipos de problemas de acordo com a categoria selecionada
  const problemTypesOptions = category
    ? problem_categories
        ?.filter((cat) => cat.id === category.value)
        .map((category) => category.problem_types)[0]
        .map((problemType) => ({
          value: problemType?.id ?? '',
          label: problemType?.name ?? '',
        }))
    : [];

  const onSubmit = useCallback(
    ({
      requester,
      city_payload,
      phone,
      cellphone,
      dateTime,
      email,
      alerts,
      problem_category_payload,
      problem_types_payload,
      workstation_payload,
      description,
    }: IssuePayloadOpen) => {
      const issueId = locate.state.externIssue?.id ?? '';
      const payload: PutUpdateIssueParamsOpen = {
        issueId,
        phone: phone ?? watch('phone'),
        requester,
        dateTime,
        alerts,
        cellphone: maskPhoneField(cellphone) ?? '',
        city_id: city_payload?.value,
        description,
        date: new Date(),
        problem_category_id: problem_category_payload?.value,
        problem_types_ids: problem_types_payload.map((type) => type.value),
        workstation_id: workstation_payload?.value,
        email,
      };

      updateIssue(payload);
    },
    [updateIssue, locate.state.externIssue?.id, watch]
  );

  useEffect(() => {
    if (problemTypes) {
      setSelectedProblemTypes(problemTypes);
    }
  }, [problemTypes]);

  return (
    <form id="update-issue-form" onSubmit={handleSubmit(onSubmit)}>
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
          name="phone"
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
              placeholder="(00) 0000-0000"
              value={value}
              disabled
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
          label="E-mail"
          {...register('email', {
            required: 'Campo obrigatório',
          })}
          errors={errors?.email}
          placeholder="exemplo@gmail.com"
          leftElement={
            <InputLeftElement>
              <Icon as={HiOutlineMail} fontSize={20} />
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

        <Box>
          <Controller
            control={control}
            name="dateTime"
            rules={{
              min: {
                value: new Date().toISOString(),
                message: 'Informe uma data no futuro.',
              },
            }}
            render={({
              field: { onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <>
                <Input
                  {...register('dateTime')}
                  label="Data do Evento"
                  type="datetime-local"
                  name="dateTime"
                  id="dateTime"
                  onChange={onChange}
                  ref={ref}
                  onBlur={onBlur}
                  value={parseSelectedDatetime(String(watch('dateTime')))}
                />
                <Text color="red.100" mt=".5rem">
                  {error ? error.message : null}
                </Text>
              </>
            )}
          />
        </Box>

        <GridItem colSpan={2} display="center" justifyContent="center">
          <Input
            minHeight="150px"
            verticalAlign="top"
            placeholder="Descrição do Problema"
            label="Descrição do Problema"
            {...register('description', {
              required: 'Campo obrigatório',
            })}
            errors={errors?.description}
          />
        </GridItem>

        <GridItem colSpan={2} display="flex" justifyContent="space-between" />
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
        size="lg"
        form="update-issue-form"
        width="100%"
        isLoading={isUpdatingIssue}
      >
        Atualizar Agendamento
      </Button>
    </form>
  );
}
