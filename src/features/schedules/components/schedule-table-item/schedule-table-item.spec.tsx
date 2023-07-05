import { ChakraProvider, Table } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '@/contexts/AuthContext';
import { ScheduleTableItem } from '@/features/schedules/components/schedule-table-item';
import { theme } from '@/styles/theme';
import { Schedule, ScheduleStatus } from '@/features/schedules/types';

const schedule: Schedule = {
  id: '1',
  dateTime: 'string',
  description: 'string',
  status: ScheduleStatus.PENDENT,
  alerts: [],
  issue: {
    id: '1',
    requester: 'Mockerson',
    phone: '61988554474',
    city_id: '123',
    workstation_id: '123',
    email: 'mcok@email.com',
    date: new Date(),
    problem_category: {
      id: '1',
      name: 'Category Mock',
      description: 'Category Mock',
      problem_types: [
        {
          id: '1',
          name: 'Type Mock',
        },
      ],
    },
    problem_types: [
      {
        id: '1',
        name: 'Type Mock',
      },
    ],
  },
};

const workstation = {
  id: 1,
  name: 'Workstation 1',
};

const selectedSchedules: Schedule[] = [];

const setSelectedSchedules = vi.fn();

describe('Schedule-table-item', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={new QueryClient()}>
              <Table>
                <ScheduleTableItem
                  schedule={schedule}
                  selectedSchedules={selectedSchedules}
                  setSelectedSchedules={setSelectedSchedules}
                  workstation={workstation}
                />
              </Table>
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('string')).toBeInTheDocument();
  });
});
