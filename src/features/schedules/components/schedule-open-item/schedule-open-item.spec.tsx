import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Schedule, ScheduleOpen, ScheduleStatus } from '../../types';
import { ScheduleEditForm } from '../schedule-edit-form';
import { ScheduleOpenItem } from '.';
import { AuthProvider } from '@/contexts/AuthContext';

const mockedSchedule: ScheduleOpen = {
  id: '1',
  dateTime: '2024-09-17T00:00:00',
  description: 'Está com problema na rede do wifi',
  status: ScheduleStatus.PROGRESS,
  alerts: [
    { id: '1', date: new Date() },
    { id: '2', date: new Date() },
  ],
  issue: {
    id: '1',
    requester: '',
    phone: '',
    city_id: '',
    workstation_id: '',
    email: '',
    date: new Date(),
    description: '',
    alerts: [],
    dateTime: new Date(),
    problem_category: {
      id: '',
      name: '',
      description: '',
      problem_types: [],
    },
    problem_types: [],
  },
};

const queryClient = new QueryClient();

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe('Schedule Open Item', () => {
  it('should display schedule status', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <ScheduleOpenItem
                schedule={mockedSchedule}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isDeleting={false}
              />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const status = queryByText('Em andamento');
    expect(status).toBeInTheDocument();
  });
});
