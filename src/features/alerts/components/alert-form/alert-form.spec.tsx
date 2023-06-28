import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  GetAllUsersResponse,
  getAllUsers,
  useGetAllUsers,
} from '@/features/users/api/get-all-users';
import { AlertForm } from '.';

const alert: AlertPayload = {
  target: { value: 'joao@email.com', label: 'João Amoedo' },
  message: 'Cheque o chamado n 56',
};

describe('AlertForm', () => {
  const queryClient = new QueryClient();
  let users: GetAllUsersResponse;
  let isLoadingUsers: boolean;

  beforeAll(async () => {
    const response = await useGetAllUsers();
    users = await getAllUsers();
    isLoadingUsers = response.isLoading;
  });
  it.todo('should have the correct data', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AlertForm
          onSubmit={() => {}}
          isSubmitting={false}
          users={users}
          isLoadingUsers={isLoadingUsers}
        />
      </QueryClientProvider>
    );
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensagem')).toHaveValue(
      'Cheque o chamado n 56'
    );
  });

  it.todo('should be able to update an alert', async () => {
    const handleSubmit = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <AlertForm
          defaultValues={alert}
          onSubmit={handleSubmit}
          isSubmitting={false}
          users={users}
          isLoadingUsers={isLoadingUsers}
        />
      </QueryClientProvider>
    );

    await act(async () => screen.getByText('Enviar').click());

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it.todo('should be able to create a alert', async () => {
    const handleSubmit = vi.fn();
    render(
      <AlertForm
        onSubmit={handleSubmit}
        isSubmitting={false}
        users={users}
        isLoadingUsers={isLoadingUsers}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Nome'), {
        target: { value: 'João Amoedo' },
      });
      fireEvent.change(screen.getByLabelText('Mensagem'), {
        target: { value: 'Cheque o chamado n 56' },
      });

      screen.getByText('Enviar').click();
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
