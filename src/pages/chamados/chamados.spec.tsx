import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Chamados } from '@/pages/chamados';

import 'intersection-observer';

beforeAll(() => {
  vi.mock('@/features/issues/api/get-all-issues', () => ({
    useGetAllIssues: vi.fn().mockReturnValue({
      id: '1',
      requester: 'Mockerson',
      phone: '61988554474',
      city_id: '123',
      workstation_id: '123',
      problem_category_id: 'Category Mock',
      problem_types_ids: ['Type Mock'],
      date: new Date(),
      email: 'mockerson@mock.com',
    }),
  }));
});

const queryClient = new QueryClient();

describe('Issues page', () => {
  it('should display a heading', async () => {
    const { findByRole } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Chamados />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const heading = await findByRole('heading');
    expect(heading).toHaveTextContent('Chamados');
  });

  it('should display a list', async () => {
    const { findByRole } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Chamados />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const list = await findByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should display a new issue button', async () => {
    const { findByRole } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Chamados />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const button = await findByRole('button', { name: 'Novo Chamado' });
    expect(button).toBeInTheDocument();
  });

  it('should display a refresh button', async () => {
    const { findByRole } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Chamados />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const button = await findByRole('button', { name: 'Atualizar Dados' });
    expect(button).toBeInTheDocument();
  });
});
