import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { BsPersonCircle, BsTelephoneFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { RiCellphoneFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { ControlledSelect } from '@/components/form-fields';
import { Input } from '@/components/form-fields/input';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { usePutUpdateExternIssue } from '@/features/issues/api/put-edit-extern-issue';
import {
  IssuePayloadOpen,
  PutUpdateExternIssueParams,
} from '@/features/issues/types';
import { parseSelectedDatetime, parseSelectedDate } from '@/utils/format-date';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { useGetAllProblemCategories } from '@/features/problem/api/get-all-problem-category';
import { maskPhoneField } from '@/utils/form-utils';
import { useAuth } from '@/contexts/AuthContext';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { ActionButton } from '@/components/action-buttons';

export function UpdateExternIssueForm() {
  const locate = useLocation();
  const { externIssue } = locate.state;

  const { data: cities, isLoading: isLoadingCities } = useGetAllCities(0);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IssuePayloadOpen>({
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
      alert_dates: externIssue?.alerts.map((alert: { date: string }) => ({
        date: parseSelectedDate(alert.date) ?? '',
      })),
      dateTime: locate.state.externIssue.dateTime ?? '',
      ...locate.state.externIssue,
    },
  });

  const [selectedProblemTypes, setSelectedProblemTypes] = useState(
    locate.state.problem_types_payload
  );

  const [selectedAlerts, setSelectedAlerts] = useState(locate.state.alerts);

  const [selectedDateTime, setSelectedDateTime] = useState(
    locate.state.dateTime
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
  // const alert_dates = watch('alert_dates');

  const workstationsOptions = city
    ? workstations
        ?.filter((workstation) => workstation.city.id === city.value)
        .map((workstation) => ({
          value: workstation?.id ?? '',
          label: workstation?.name ?? '',
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

  const dateTime = parseSelectedDatetime(String(watch('dateTime')));
  // console.log('dt', dateTime)

  const onSubmit = useCallback(
    ({
      requester,
      city_payload,
      phone,
      cellphone,
      dateTime,
      email,
      alerts,
      date,
      problem_category_payload,
      problem_types_payload,
      workstation_payload,
      description,
    }: IssuePayloadOpen) => {
      const issueId = locate.state.externIssue?.id ?? '';
      const payload: PutUpdateExternIssueParams = {
        issueId,
        phone,
        requester,
        dateTime,
        alerts,
        cellphone,
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
    [updateIssue, locate.state.externIssue?.id]
  );

  useEffect(() => {
    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }, [dateTime]);

  useEffect(() => {
    if (problemTypes) {
      setSelectedProblemTypes(problemTypes);
    }
  }, [problemTypes]);

  const { fields, append, remove } = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'alerts',
  });

  const handleAddDate = useCallback(() => {
    append({ label: '', value: '' });
  }, [append]);

  const handleRemoveDate = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

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

        <Input
          label="Celular"
          {...register('cellphone', {
            required: 'Campo obrigatório',
          })}
          errors={errors?.cellphone}
          placeholder="(00) 00000-0000"
          leftElement={
            <InputLeftElement>
              <Icon as={RiCellphoneFill} fontSize={20} />
            </InputLeftElement>
          }
        />

        <ControlledSelect
          // defaultValue={{
          //   label: city.name,
          //   value: city.id,
          // }}
          control={control}
          name="city_payload"
          id="city_payload"
          options={citiesOptions}
          isLoading={isLoadingCities}
          placeholder="Cidade"
          label="Cidade"
          rules={{ required: 'Campo obrigatório' }}
        />

        {/* <Select
          aria-label="Filtrar por cidade"
          placeholder="Cidade"
          options={citiesOptions}
          onChange={(option) => setSelectedCity(option?.value || '')}
          isClearable
          isSearchable={false}
          chakraStyles={chakraStyles}
          components={customComponents}
        /> */}

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
              field: { onChange, onBlur, ref, value },
              fieldState: { error },
            }) => (
              <>
                <Input
                  {...register('dateTime', {
                    required: 'Campo obrigatório',
                  })}
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

        <Box>
          <Flex gap={4} alignItems="center" my="-0.2rem">
            <Text>Alertas</Text>
          </Flex>
          <Divider mb={4} mt={1} />
          <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={6}>
            {fields?.map((field, index) => {
              return (
                <Flex key={field.id} gap={1}>
                  <Controller
                    control={control}
                    name="alerts"
                    rules={{
                      min: {
                        value: new Date().toISOString(),
                        message: 'Informe uma data no futuro.',
                      },
                      required: 'Informe a data ou exclua o alerta',
                    }}
                    render={({
                      field: { onChange, onBlur, ref, value },
                      fieldState: { error },
                    }) => (
                      <Box w="full">
                        <Input
                          label="alerts"
                          type="date"
                          name={`alert_dates.${index}.date`}
                          id={`alert_dates.${index}.date`}
                          onChange={onChange}
                          min={new Date().toISOString()}
                          ref={ref}
                          onBlur={onBlur}
                          w="full"
                          value={value}
                        />
                        <Text color="red.400" mt=".5rem">
                          {error ? error.message : null}
                        </Text>
                      </Box>
                    )}
                  />

                  <DeleteButton
                    label={`Alerta ${index + 1}`}
                    onClick={handleRemoveDate(index)}
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
          <Flex my="-0.3rem">
            <ActionButton
              label="Adicionar Alerta"
              icon={<FaPlus />}
              variant="outline"
              color="primary"
              tooltipProps={{
                placement: 'bottom',
              }}
              onClick={handleAddDate}
            />
          </Flex>
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
