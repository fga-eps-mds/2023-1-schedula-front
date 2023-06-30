/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ControlledSelect } from '@/components/form-fields';
import { AlertPayload } from '../../type';
import { GetAllUsersResponse } from '@/features/users/api/get-all-users';

interface AlertFromProps {
  defaultValues?: AlertPayload;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  users: GetAllUsersResponse | undefined;
  isLoadingUsers: boolean;
}

export function AlertForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  users,
  isLoadingUsers,
}: AlertFromProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const usersOptions = users?.map((users) => ({
    label: users?.name,
    value: users?.email,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <ControlledSelect
          control={control}
          name="target"
          id="target"
          options={usersOptions}
          isLoading={isLoadingUsers}
          placeholder="Destinatario"
          label="Destinatario"
          rules={{ required: 'Campo obrigatório.' }}
        />
        <FormLabel>Mensagem</FormLabel>
        <Textarea
          height="100%"
          {...register('message', {
            required: 'Campo obrigatório',
            maxLength: 500,
          })}
          placeholder="Digite a mensagem"
        />
        {errors.message && errors.message.type === 'maxLength' && (
          <span> O tamanho máximo da mensagem é de 500 caracteres </span>
        )}
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Button type="submit" size="lg" width="80%" isLoading={isSubmitting}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
