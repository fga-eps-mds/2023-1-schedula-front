import { SubmitHandler } from 'react-hook-form';

interface EventFormProps {
  defaultValues?: ChamadoEvent | undefined;
  onSubmit: SubmitHandler<ChamadoEvent>;
}

export function EventForm({ defaultValues, onSubmit }: EventFormProps) {
  // const { register, handleSubmit, control } = useForm<ChamadoEvent>({
  //   defaultValues: {
  //     alert_dates: [new Date()],
  //     ...defaultValues,
  //   },
  // });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   shouldUnregister: true,
  //   name: 'alert_dates',
  // });

  // const handleAddDate = useCallback(() => {
  //   append(new Date());
  // }, [append]);

  // const handleRemoveDate = useCallback(
  //   (index: number) => () => {
  //     remove(index);
  //   },
  //   [remove]
  // );

  return (
    <p>Formulário</p>
    // <>
    //   {/* Self-enclosing form to avoid nested forms submiting the main form */}
    //   <form id="event-form" onSubmit={handleSubmit(onSubmit)} />
    //   <Flex flexDirection="column" gap={6}>
    //     <Datepicker
    //       label="Data e Hora do Evento"
    //       control={control}
    //       name="event_date"
    //       id="event_date"
    //     />

    //     <Box>
    //       <Flex gap={2} alignItems="center">
    //         <ActionButton
    //           label="Adicionar Alerta"
    //           icon={<FaPlus />}
    //           variant="outline"
    //           color="primary"
    //           tooltipProps={{
    //             placement: 'bottom',
    //           }}
    //           onClick={handleAddDate}
    //         />
    //         <Text>Alertas</Text>
    //       </Flex>
    //       <Divider mb={4} mt={1} />
    //       <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={6}>
    //         {fields?.map((field, index) => {
    //           return (
    //             <Flex key={field.id} gap={1}>
    //               <Datepicker
    //                 label={`Data do Alerta ${index + 1}`}
    //                 control={control}
    //                 name={`alert_dates.${index}`}
    //                 id={`alert_dates.${index}`}
    //                 showTimeInput={false}
    //                 dateFormat="dd/MM/yyyy"
    //               />
    //               <DeleteButton
    //                 label={`Alerta ${index + 1}`}
    //                 onClick={handleRemoveDate(index)}
    //                 variant="ghost"
    //                 alignSelf="flex-end"
    //                 _hover={{
    //                   backgroundColor: 'blackAlpha.300',
    //                 }}
    //               />
    //             </Flex>
    //           );
    //         })}
    //       </Grid>
    //     </Box>

    //     <Flex w="100%" flexDirection="column">
    //       <FormLabel htmlFor="description">Descrição</FormLabel>
    //       <Textarea {...register('description')} height="100%" />
    //     </Flex>

    //     <Button type="submit" size="lg" form="event-form" width="100%">
    //       Agendar Serviço
    //     </Button>
    //   </Flex>
    // </>
  );
}
