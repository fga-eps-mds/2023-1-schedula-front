import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { ScheduleEditForm } from '.';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { Schedule, ScheduleStatus } from '../../types';

const mockOnSubmit = vi.fn();

const queryClient = new QueryClient();

const date = new Date();

const mockedSchedule: Schedule = {
  id: '1',
  dateTime: '2024-09-17T00:00:00',
  description: 'Está com problema na rede do wifi',
  status: ScheduleStatus.PROGRESS,
  alerts: [
    { id: '1', date },
    { id: '2', date: new Date() },
  ],
  issue: {
    id: '1',
    requester: 'cliente',
    phone: '99999999999',
    city_id: '1',
    workstation_id: '1',
    email: 'example@example.com',
    date: new Date(),
    problem_category: {
      id: '1',
      name: 'problema 1',
      description: 'wifi esta ruim',
      problem_types: [
        { id: '1', name: 'problema_tipo_1' },
        { id: '2', name: 'problema_tipo_2' },
      ],
    },
    problem_types: [
      { id: '1', name: 'problema_tipo_1' },
      { id: '2', name: 'problema_tipo_2' },
    ],
  },
};

describe('Schedule Edit Form', () => {
  it('should display an input', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <ScheduleEditForm onSubmit={mockOnSubmit} isSubmitting={false} />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = queryByText('Atualizar Agendamento');
    expect(btn).toBeInTheDocument();
  });
  it('should display requester name', () => {
    const { queryByLabelText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <ScheduleEditForm
                schedule={mockedSchedule}
                onSubmit={mockOnSubmit}
                isSubmitting={false}
              />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const data = queryByLabelText('Status');

    expect(data).toBeInTheDocument();
  });
});
