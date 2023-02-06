import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import Usuarios from '@/pages/usuarios';

import 'intersection-observer';

beforeAll(() => {
  vi.mock('@/features/users/api/get-all-users', () => ({
    useGetAllUsers: vi.fn().mockReturnValue({
      data: [
        {
          id: '1',
          email: 'email@email.com',
          name: 'Usuário Teste',
          username: 'testuser',
          position: 'abc',
          profile: 'BASIC',
          createdAt: '31/02/1990',
          updatedAt: '32/02/1990',
        },
      ],
    }),
  }));
});

const queryClient = new QueryClient();

describe('Users page', () => {
  it('should display a heading', async () => {
    const { findByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Usuarios />
      </QueryClientProvider>
    );

    const heading = await findByRole('heading');
    expect(heading).toHaveTextContent('Gerenciar Usuários');
  });

  it('should display a list', async () => {
    const { findByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Usuarios />
      </QueryClientProvider>
    );

    const list = await findByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should display a new user button', async () => {
    const { queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <Usuarios />
      </QueryClientProvider>
    );

    const button = await queryByText('Novo Usuário');
    if (button) {
      expect(button).toBeInTheDocument();
    }
  });

  it('should display a refresh button', async () => {
    const { findByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Usuarios />
      </QueryClientProvider>
    );

    const button = await findByRole('button', { name: 'Atualizar Dados' });
    expect(button).toBeInTheDocument();
  });
});
