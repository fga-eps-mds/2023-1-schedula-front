import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, VStack } from '@chakra-ui/react';

import { Input } from '@/components/form-fields';
import {
  ProblemType,
  ProblemTypePayload,
} from '@/features/problem/problem-types/types';

interface ProblemFormProps {
  defaultValues?: ProblemType | undefined;
  onSubmit: SubmitHandler<ProblemTypePayload>;
  isSubmitting: boolean;
}

export function ProblemForm({ defaultValues, onSubmit }: ProblemFormProps) {
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
        <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
          Registrar
        </Button>
      </VStack>
    </form>
  );
}
