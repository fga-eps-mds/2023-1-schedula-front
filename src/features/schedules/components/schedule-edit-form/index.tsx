/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
import { ActionButton } from '@/components/action-buttons';
import { DeleteButton } from '@/components/action-buttons/delete-button';

import 'react-datepicker/dist/react-datepicker.css';
import { IssueInfo } from '@/features/issues/components/issue-info';
import { useGetCity } from '@/features/cities/api/get-all-cities';
import { useGetAllWorkstationsCache } from '@/features/workstations/api/get-all-workstations';
import { Schedule, ScheduleStatus } from '@/features/schedules/types';
import { parseSelectedDate, parseSelectedDatetime } from '@/utils/format-date';
import { ControlledSelect } from '@/components/form-fields';

interface ScheduleEditFormProps {
  schedule?: Schedule;
  onSubmit: any;
  isSubmitting: boolean;
}

export function ScheduleEditForm({
  schedule,
  onSubmit,
  isSubmitting,
}: ScheduleEditFormProps) {
  const { data: city } = useGetCity(schedule?.issue?.city_id ?? '');
  const data = useGetAllWorkstationsCache();
  const workstation = data?.data?.filter(
    (workstation) => workstation.id === schedule?.issue?.workstation_id
  )[0].name;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      event_date: parseSelectedDatetime(schedule?.dateTime ?? ''),
      alert_dates: schedule?.alerts.map((alert) => ({
        date: parseSelectedDate(alert.date),
      })),
      description: schedule?.description,
      status_e: schedule?.status,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'alert_dates',
  });

  const handleAddDate = useCallback(() => {
    append({ date: '' });
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
          applicant_name={schedule?.issue?.requester ?? ''}
          applicant_phone={schedule?.issue?.phone ?? ''}
          city={city?.name ?? ''}
          problem=""
          category={schedule?.issue?.problem_category?.name ?? ''}
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
              field: { onChange, onBlur, ref, value },
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
                  value={value}
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
                      field: { onChange, onBlur, ref, value },
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
                          value={value}
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

        <ControlledSelect
          control={control}
          name="status_e"
          id="status_e"
          options={Object.entries(ScheduleStatus).map(([value, label]) => ({
            label,
            value,
          }))}
          label="Status"
          placeholder={schedule?.status}
          rules={{
            shouldUnregister: true,
          }}
        />

        <Button
          type="submit"
          size="lg"
          form="event-form"
          width="100%"
          isLoading={isSubmitting}
        >
          Atualizar Agendamento
        </Button>
      </Flex>
    </form>
  );
}
