import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import moment, { Moment } from 'moment';
import { Schedule, ScheduleStatus } from '../../types';
import { WorkstationItem } from '@/features/workstations/components/workstation-item';
import { UserItem } from '@/features/users/components/user-item';
import { User } from '@/features/users/api/types';
import { CityItem } from '@/features/cities/components/city-item';
import { ScheduleItem } from '@/features/schedules/components/schedule-item';

const mockedUser: User = {
  id: '1',
  email: 'email@email.com',
  name: 'admin',
  username: 'admin',
  position: 'alguma',
  profile: 'ADMIN',
  cpf: '105.622.250-64',
  createdAt: '31/02/1990',
  updatedAt: '32/02/1990',
};
const mockedCity: City = {
  id: '1',
  name: 'Goiânia',
  state: 'Goiás',
};
const mockedWorkStation: Workstation = {
  id: '1',
  name: 'mockStation',
  city: { id: '2', name: 'Goiás', state: 'Goiânia' },
  phone: '9999999999',
  ip: '127.0.0.0',
  gateway: 'mockGate',
  is_regional: true,
  vpn: true,
};
const mockedSchedule: Schedule = {
  id: '1',
  dateTime: '2024-09-17T00:00:00',
  description: 'Está com problema na rede do wifi',
  status: ScheduleStatus.PROGRESS,
  alerts: [
    { id: '1', date: '2021-10-10' },
    { id: '2', date: '2021-10-10' },
  ],
  issue: {
    id: '1',
    requester: 'cliente',
    phone: '99999999999',
    city_id: '1',
    workstation_id: '2',
    email: 'example@example.com',
    date: '2021-10-10',
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
const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn(() => {});
describe('ScheduleItem', () => {
  const queryClient = new QueryClient();
  it('should display the workstation of schedule card correctly', async () => {
    const { findAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <WorkstationItem
          workstation={mockedWorkStation}
          onEdit={mockedOnEditFunction}
          onDelete={mockedOnDeleteFunction}
          isDeletingRegionalWorkstation
        />
      </QueryClientProvider>
    );
    const name = await findAllByText(mockedWorkStation?.name);
    expect(name[0]).toBeInTheDocument();
  });

  it('should display the local of the shedule card correctly', async () => {
    const { findAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <CityItem
          city={mockedCity}
          isDeleting={false}
          onEdit={mockedOnEditFunction}
          onDelete={mockedOnDeleteFunction}
        />
      </QueryClientProvider>
    );
    const name = await findAllByText(mockedCity?.name);
    expect(name[0]).toBeInTheDocument();
  });
  it('should display the date of the shedule card correctly', async () => {
    const { findAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <ScheduleItem
          schedule={mockedSchedule}
          isDeleting={false}
          onEdit={mockedOnEditFunction}
          onDelete={mockedOnDeleteFunction}
        />
      </QueryClientProvider>
    );
    const dataEsperada = moment(mockedSchedule.dateTime);
    const dataAtual = dataEsperada.format('YYYY-MM-DD');
    expect(dataAtual).toEqual('2024-09-17');
  });
  it('should display the hour of the shedule card correctly', async () => {
    const { findAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <ScheduleItem
          schedule={mockedSchedule}
          isDeleting={false}
          onEdit={mockedOnEditFunction}
          onDelete={mockedOnDeleteFunction}
        />
      </QueryClientProvider>
    );
    const dataEsperada: Moment = moment(mockedSchedule.dateTime);
    const horaAtual: string = dataEsperada.format('HH:mm:ss');
    expect(horaAtual).toEqual('00:00:00');
  });
  it('should display the name of the shedule card correctly', async () => {
    const { findByText } = render(
      <QueryClientProvider client={queryClient}>
        <UserItem
          user={mockedUser}
          onEdit={mockedOnEditFunction}
          onDelete={mockedOnDeleteFunction}
          isDeleting={false}
        />
      </QueryClientProvider>
    );
    const name = await findByText(
      `${mockedUser.name} [${mockedUser.username}]`
    );
    expect(name).toBeInTheDocument();
  });
});
