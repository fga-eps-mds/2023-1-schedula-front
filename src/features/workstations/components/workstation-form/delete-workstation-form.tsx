import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Flex, GridItem, Select } from '@chakra-ui/react';
import { DeleteWorkstationProps } from '@/features/workstations/types';

interface WorkstationFormProps {
  defaultValues?: { name: string; id: string; destination: string }[];
  isSubmitting: boolean;
  workstations?: { name: string; value: string }[];
  onSubmit: (values: DeleteWorkstationProps) => void;
}

export function DeleteWorkstationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  workstations,
}: WorkstationFormProps) {
  const { control, handleSubmit } = useForm<DeleteWorkstationProps>({
    defaultValues: {
      reallocatedWorkstations: defaultValues,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'reallocatedWorkstations',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Flex
          key={field.id}
          gap="1rem"
          alignItems="center"
          justifyContent="space-between"
          mb="2rem"
        >
          <GridItem colSpan={1}>
            <span>{field.name}</span>
          </GridItem>

          <GridItem colSpan={1}>
            <Controller
              control={control}
              name={`reallocatedWorkstations.${index}.destination`}
              render={({ field }) => (
                <Select placeholder="Regional de Destino" {...field}>
                  {workstations?.map((workstationsOption) => (
                    <option
                      style={{
                        color: 'white',
                        background: 'transparent',
                        fontWeight: 'medium',
                      }}
                      key={workstationsOption.value}
                      value={workstationsOption.value}
                    >
                      {workstationsOption.name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </GridItem>
        </Flex>
      ))}

      <GridItem colSpan={2}>
        <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
          Salvar
        </Button>
      </GridItem>
    </form>
  );
}
