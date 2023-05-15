import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Input } from '@/components/form-fields';
import { CategoryTutorial } from '@/features/categories-tutorial/api/types';

interface CategoryTutorialFormProps {
  defaultValues?: CategoryTutorial;
  onSubmit: (data: CategoryTutorialPayload) => void;
  isSubmitting: boolean;
}

export function CategoryTutorialForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: CategoryTutorialFormProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryTutorialPayload>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="1rem">
        {!isEditing ? (
          <Text textAlign="center" fontWeight="bold">
            Insira as informações para cadastrar uma nova categoria
          </Text>
        ) : null}

        <Input
          label="Nome"
          {...register('name', { required: 'Campo obrigatório' })}
          errors={errors?.name}
          placeholder="Nome"
        />
      </Flex>

      <Button
        type="submit"
        size="lg"
        width="100%"
        mt={8}
        isLoading={isSubmitting}
      >
        {isEditing ? 'Salvar' : 'Criar categoria'}
      </Button>
    </form>
  );
}
