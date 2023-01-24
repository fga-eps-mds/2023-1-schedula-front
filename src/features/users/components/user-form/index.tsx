import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, GridItem } from '@chakra-ui/react';
import { ControlledSelect, Input } from '@/components/form-fields';
import { User } from '@/features/users/api/types';
import { USER_ACCESS } from '@/features/users/constants';

interface UserFormProps {
  defaultValues?: User | undefined;
  onSubmit: (data: UserFormValues) => void;
  isSubmitting: boolean;
}

export type UserFormValues = Omit<RegisterUserPayload, 'profile'> & {
  profile: SelectOption<keyof typeof USER_ACCESS>;
};

export function UserForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: UserFormProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      ...defaultValues,
      profile: {
        label: defaultValues?.profile
          ? USER_ACCESS[defaultValues.profile]
          : USER_ACCESS.USER,
        value: defaultValues ? defaultValues.profile : 'BASIC',
      },
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Input
          label="Nome Completo"
          {...register('name', { required: 'Campo obrigatório' })}
          errors={errors?.name}
          placeholder="Nome completo"
        />
        <Input
          label="Nome de Usuário"
          {...register('username', { required: 'Campo obrigatório' })}
          errors={errors?.username}
          placeholder="Username"
        />

        <GridItem colSpan={2}>
          <Input
            label="Email"
            {...register('email')}
            errors={errors?.email}
            placeholder="exemplo@email.com"
          />
        </GridItem>

        <Input
          label="Senha"
          type="password"
          {...register('password', {
            required: isEditing ? false : 'Campo obrigatório',
          })}
          errors={errors?.password}
          placeholder="Senha"
        />
        <Input
          label="Confirmar senha"
          type="password"
          {...register('confirmPassword', {
            required: isEditing ? false : 'Campo obrigatório',
            validate: (value) =>
              value === watch('password') || 'Senhas não conferem',
          })}
          errors={errors?.confirmPassword}
          placeholder="Confirmar Senha"
        />

        {/* <ControlledSelect
          label="Perfil"
          control={control}
          name="profile"
          id="profile"
          options={Object.entries(USER_ACCESS).map(([value, label]) => ({
            value,
            label,
          }))}
          placeholder="Perfil"
          rules={{ required: 'Campo obrigatório' }}
        /> */}
        <Input
          label="Cargo"
          {...register('position', { required: 'Campo obrigatório' })}
          errors={errors?.position}
          placeholder="Cargo"
        />

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            {isEditing ? 'Salvar' : 'Criar usuário'}
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
}
