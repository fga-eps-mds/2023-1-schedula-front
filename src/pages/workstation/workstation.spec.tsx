import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { Workstation } from '@/pages/workstation';

import 'intersection-observer';

beforeAll(() => {
  vi.mock('@/features/workstations/api/get-all-workstations', () => ({
    useGetAllWorkstations: vi.fn().mockReturnValue({
      data: [
        {
          id: '1',
          name: 'mockStation',
          city: { id: '2', name: 'Goiás', state: 'Goiânia' },
          phone: '9999999999',
          ip: '127.0.0.0',
          gateway: 'mockGate',
          is_regional: true,
        },
      ],
    }),
  }));
});

const queryClient = new QueryClient();

describe('Workstations page', () => {
  it('should display a heading', async () => {
    const { findByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Workstation />
      </QueryClientProvider>
    );

    const heading = await findByRole('heading');
    expect(heading).toHaveTextContent('Gerenciar Postos de Trabalho');
  });

  it('should display a list', async () => {
    const { findByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Workstation />
      </QueryClientProvider>
    );

    const list = await findByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should display a new workstation button', async () => {
    const { queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <Workstation />
      </QueryClientProvider>
    );

    const button = await queryByText('Novo Posto de Trabalho');
    if (button) {
      expect(button).toBeInTheDocument();
    }
  });

  it('should display a refresh button', async () => {
    const { findByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Workstation />
      </QueryClientProvider>
    );

    const button = await findByRole('button', { name: 'Atualizar Dados' });
    expect(button).toBeInTheDocument();
  });

  it('should display a checkbox', async () => {
    const { findByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Workstation />
      </QueryClientProvider>
    );

    const button = await findByRole('checkbox', { name: 'Regionais' });
    expect(button).toBeInTheDocument();
  });
});
