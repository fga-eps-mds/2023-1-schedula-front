import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Text,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { Issue } from '@/features/issues/types';
import { ActionButton } from '@/components/action-buttons';
import { DeleteButton } from '@/components/action-buttons/delete-button';

import 'react-datepicker/dist/react-datepicker.css';
import { IssueInfo } from '@/features/issues/components/issue-info';
import { useGetCity } from '@/features/cities/api/get-all-cities';
import { useGetAllWorkstationsCache } from '@/features/workstations/api/get-all-workstations';

interface EventFormProps {
  issue?: Issue | undefined;
  onSubmit: SubmitHandler<ChamadoEvent>;
  isSubmitting: boolean;
}

export function ScheduleForm({
  issue,
  onSubmit,
  isSubmitting,
}: EventFormProps) {
  const { data: city } = useGetCity(issue?.city_id ?? '');
  const data = useGetAllWorkstationsCache();
  const workstation = data?.data?.filter(
    (workstation) => workstation.id === issue?.workstation_id
  )[0].name;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChamadoEvent>({
    defaultValues: {
      alert_dates: [{ date: new Date() }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'alert_dates',
  });

  const handleAddDate = useCallback(() => {
    append({ date: new Date() });
  }, [append]);

  const handleRemoveDate = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  return (
    <form id="event-form" onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap={6}>
        <IssueInfo
          applicant_name={issue?.requester ?? ''}
          applicant_phone={issue?.phone ?? ''}
          city={city?.name ?? ''}
          problem={
            issue?.problem_category.problem_types
              .map((problem) => problem.name)
              .join(' - ') ?? ''
          }
          category={issue?.problem_category.name ?? ''}
          workstation={workstation ?? ''}
        />

        <Box>
          <Text>Data e Hora do Evento</Text>
          <Controller
            control={control}
            name="event_date"
            rules={{
              min: {
                value: new Date().toISOString(),
                message: 'Informe uma data no futuro.',
              },
              required: 'Informe a data',
            }}
            render={({
              field: { onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <>
                <Input
                  type="datetime-local"
                  name="event_date"
                  id="event_date"
                  onChange={onChange}
                  ref={ref}
                  onBlur={onBlur}
                />
                <Text color="red.100" mt=".5rem">
                  {error ? error.message : null}
                </Text>
              </>
            )}
          />
        </Box>

        <Box>
          <Flex gap={2} alignItems="center">
            <Text>Alertas</Text>
          </Flex>
          <Divider mb={4} mt={1} />
          <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={6}>
            {fields?.map((field, index) => {
              return (
                <Flex key={field.id} gap={1}>
                  <Controller
                    control={control}
                    name={`alert_dates.${index}.date`}
                    rules={{
                      min: {
                        value: new Date().toISOString(),
                        message: 'Informe uma data no futuro.',
                      },
                      required: 'Informe a data ou exclua o alerta',
                    }}
                    render={({
                      field: { onChange, onBlur, ref },
                      fieldState: { error },
                    }) => (
                      <Box w="full">
                        <Input
                          type="date"
                          name={`alert_dates.${index}.date`}
                          id={`alert_dates.${index}.date`}
                          onChange={onChange}
                          min={new Date().toISOString()}
                          ref={ref}
                          onBlur={onBlur}
                          w="full"
                        />
                        <Text color="red.100" mt=".5rem">
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
          <Flex my="1rem">
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

        <Flex w="100%" flexDirection="column">
          <FormLabel htmlFor="description">Descrição</FormLabel>
          <Textarea
            {...register('description', { maxLength: 500 })}
            height="100%"
          />
          {errors.description && errors.description.type === 'maxLength' && (
            <span>Tamanho máximo é de 500 caracteres</span>
          )}
        </Flex>

        <Button
          type="submit"
          size="lg"
          form="event-form"
          width="100%"
          isLoading={isSubmitting}
        >
          Agendar Serviço
        </Button>
      </Flex>
    </form>
  );
}
