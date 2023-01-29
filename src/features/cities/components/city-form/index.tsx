import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Input } from '@/components/form-fields';
import { City } from '@/features/cities/api/types';

interface CityFormProps {
  defaultValues?: City;
  onSubmit: (data: CityPayload) => void;
  isSubmitting: boolean;
}

export function CityForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: CityFormProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CityPayload>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="1rem">
        {!isEditing ? (
          <Text textAlign="center" fontWeight="bold">
            Insira as informações para cadastrar uma nova cidade
          </Text>
        ) : null}

        <Input
          label="Nome"
          {...register('name', { required: 'Campo obrigatório' })}
          errors={errors?.name}
          placeholder="Nome"
        />

        <Input
          label="Estado"
          {...register('state', { required: 'Campo obrigatórtio' })}
          errors={errors?.name}
          placeholder="Estado"
        />
      </Flex>

      <Button
        type="submit"
        size="lg"
        width="100%"
        mt={8}
        isLoading={isSubmitting}
      >
        {isEditing ? 'Salvar' : 'Criar cidade'}
      </Button>
    </form>
  );
}
