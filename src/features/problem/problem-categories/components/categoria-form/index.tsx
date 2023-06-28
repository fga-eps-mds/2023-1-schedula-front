import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, VStack, Checkbox } from '@chakra-ui/react';

import { Input } from '@/components/form-fields';

interface CategoriaFormProps {
  defaultValues?: Category | undefined;
  onSubmit: SubmitHandler<CategoryPayload>;
  isSubmitting: boolean;
}

export function CategoriaForm({ defaultValues, onSubmit }: CategoriaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryPayload>({
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
        <Checkbox
          size="md"
          width="full"
          colorScheme="orange"
          {...register('visible_user_external')}
        >
          Visível para usuário externo
        </Checkbox>
        <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
          Registrar
        </Button>
      </VStack>
    </form>
  );
}
