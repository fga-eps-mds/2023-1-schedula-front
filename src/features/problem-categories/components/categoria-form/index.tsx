import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, VStack } from '@chakra-ui/react';

import { Input } from '@/components/form-fields';

interface CategoriaFormProps {
  defaultValues?: Category | undefined;
  onSubmit: SubmitHandler<CategoryPayload> | SubmitHandler<ProblemTypePayload>;
}

export function CategoriaForm({ defaultValues, onSubmit }: CategoriaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProblemTypePayload>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing={8}>
        <Input
          label="Nome"
          {...register('name', {
            required: 'Campo obrigatório',
          })}
          errors={errors?.name}
        />
        <Input
          label="Descrição"
          {...register('description')}
          errors={errors?.description}
        />
        <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
          Registrar
        </Button>
      </VStack>
    </form>
  );
}
