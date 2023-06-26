import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Chamados, sortIssues } from '@/pages/chamados';
import { Issue } from '@/features/issues/types';

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
    expect(heading).toHaveTextContent('Atendimentos');
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
    const { queryByText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Chamados />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const button = await queryByText('Novo Atendimento');
    if (button) {
      expect(button).toBeInTheDocument();
    }
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

describe('sortIssues', () => {
  it('should return an empty array when issues is undefined', () => {
    const issues: Issue[] | undefined = undefined;

    const sortedIssues = sortIssues(issues);

    expect(sortedIssues).toEqual([]);
  });

  it('should return an empty array when issues is an empty array', () => {
    const issues: Issue[] = [];

    const sortedIssues = sortIssues(issues);

    expect(sortedIssues).toEqual([]);
  });

  it('should sort issues in descending order based on the date property', () => {
    const issues: Issue[] = [
      {
        id: '1',
        requester: 'Mockerson',
        phone: '61988554474',
        city_id: '123',
        workstation_id: '123',
        email: 'mockerson@mock.com',
        date: '2023-06-15T15:30:45.500Z',
        problem_category: {
          id: '123',
          name: 'mockCategory',
          description: 'mockDesc',
          problem_types: [],
        },
        problem_types: [],
      },
      {
        id: '2',
        requester: 'Mockerson',
        phone: '61988554474',
        city_id: '123',
        workstation_id: '123',
        email: 'mockerson@mock.com',
        date: '2023-06-14T15:30:45.500Z',
        problem_category: {
          id: '123',
          name: 'mockCategory',
          description: 'mockDesc',
          problem_types: [],
        },
        problem_types: [],
      },
      {
        id: '3',
        requester: 'Mockerson',
        phone: '61988554474',
        city_id: '123',
        workstation_id: '123',
        email: 'mockerson@mock.com',
        date: '2023-06-16T15:30:45.500Z',
        problem_category: {
          id: '123',
          name: 'mockCategory',
          description: 'mockDesc',
          problem_types: [],
        },
        problem_types: [],
      },
    ];

    const sortedIssues = sortIssues(issues);

    expect(sortedIssues).toEqual([
      {
        id: '3',
        requester: 'Mockerson',
        phone: '61988554474',
        city_id: '123',
        workstation_id: '123',
        email: 'mockerson@mock.com',
        date: '2023-06-16T15:30:45.500Z',
        problem_category: {
          id: '123',
          name: 'mockCategory',
          description: 'mockDesc',
          problem_types: [],
        },
        problem_types: [],
      },
      {
        id: '1',
        requester: 'Mockerson',
        phone: '61988554474',
        city_id: '123',
        workstation_id: '123',
        email: 'mockerson@mock.com',
        date: '2023-06-15T15:30:45.500Z',
        problem_category: {
          id: '123',
          name: 'mockCategory',
          description: 'mockDesc',
          problem_types: [],
        },
        problem_types: [],
      },
      {
        id: '2',
        requester: 'Mockerson',
        phone: '61988554474',
        city_id: '123',
        workstation_id: '123',
        email: 'mockerson@mock.com',
        date: '2023-06-14T15:30:45.500Z',
        problem_category: {
          id: '123',
          name: 'mockCategory',
          description: 'mockDesc',
          problem_types: [],
        },
        problem_types: [],
      },
    ]);
  });
});
