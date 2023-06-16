import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { ControlledSelect } from '@/components/form-fields';
import { AlertPayload } from '../../type';
import { useGetAllUsers } from '@/features/users/api/get-all-users';

interface AlertFromProps {
  defaultValues?: AlertPayload;
  onSubmit: (data: AlertPayload) => void;
  isSubmitting: boolean;
}

export function AlertForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: AlertFromProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);
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

  const { data: users, isLoading: isLoadingUsers } =
    useGetAllUsers();
  const [ user, setUser]=useState(null)
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
          // value={user}
          // onChange={e => setUser(e.target.value)}
          options={usersOptions}
          isLoading={isLoadingUsers}
          placeholder="Destinatario"
          label="Destinatario"
          rules={{ required: 'Campo obrigatório.' }}
        />
      <FormLabel>Mensagem</FormLabel>
        <Textarea height="100%" 
          {...register('message', { required: 'Campo obrigatório', maxLength:500 })}
          placeholder="Digite a mensagem"
        
        />
        
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Button type="submit" size="lg" width="80%" isLoading={isSubmitting}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
