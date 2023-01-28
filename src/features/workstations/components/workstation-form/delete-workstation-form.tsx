import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import { ControlledSelect } from 'components/form-fields/controlled-select';
import { DeleteWorkstationProps } from '@/features/workstations/types';
import { getSelectOptions } from '@/utils/form-utils';

interface WorkstationFormProps {
  defaultValues?: {
    name: string;
    id: string;
    destination: { label: string; value: string };
  }[];
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
      <Box>
        <Text mb="2rem" textAlign="center" fontWeight="bold">
          Para continuar, é necessário atribuir cada delegacia dessa regional
          para outra regional
        </Text>
        {fields.map((field, index) => (
          <SimpleGrid
            key={field.id}
            gap="1rem"
            alignItems="center"
            mb="2rem"
            columns={2}
          >
            <Box>
              <strong>Delegacia:</strong>
              <p>{field.name}</p>
            </Box>

            <Controller
              control={control}
              name={`reallocatedWorkstations.${index}.destination`}
              render={() => (
                <ControlledSelect
                  control={control}
                  name={`reallocatedWorkstations.${index}.destination`}
                  id="child_workstation"
                  options={getSelectOptions(workstations, 'name', 'value')}
                  label="Regional"
                  rules={{
                    shouldUnregister: true,
                  }}
                />
              )}
            />
          </SimpleGrid>
        ))}
      </Box>

      <GridItem colSpan={2}>
        <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
          Salvar
        </Button>
      </GridItem>
    </form>
  );
}
