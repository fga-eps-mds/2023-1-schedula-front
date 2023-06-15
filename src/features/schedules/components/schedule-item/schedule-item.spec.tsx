import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { ScheduleItem } from '@/features/schedules/components/schedule-item';
import { Schedule, ScheduleStatus } from '@/features/schedules/types';

const mockedSchedule: Schedule = {
  id: '1',
  dateTime: '2021-10-10T10:00:00',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  status: ScheduleStatus.NOT_RESOLVED,
  alerts: [
    {
      id: '1',
      date: '2021-10-10',
    },
  ],
  issue: {
    id: '1',
    requester: 'Mockerson',
    phone: '61988554474',
    city_id: '123',
    workstation_id: '123',
    email: 'mcok@email.com',
    date: '2021-10-10',
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

const mockedScheduleProgress = {
  ...mockedSchedule,
  status: ScheduleStatus.PROGRESS,
};

const mockedSchedulePendent = {
  ...mockedSchedule,
  status: ScheduleStatus.PENDENT,
};

const mockedScheduleUrgent = {
  ...mockedSchedule,
  status: ScheduleStatus.URGENT,
};

const mockedScheduleResolved = {
  ...mockedSchedule,
  status: ScheduleStatus.RESOLVED,
};

const mockedScheduleDescription = {
  ...mockedSchedule,
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
};

const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn((scheduleId: string) => scheduleId);

describe('ScheduleItem', () => {
  it('should display the status NOT_RESOLVED of the schedule correctly', async () => {
    const { findAllByText } = render(
      <ScheduleItem
        schedule={mockedSchedule}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const status = await findAllByText(mockedSchedule.status);
    expect(status[0]).toBeInTheDocument();
  });

  it('should display the status PROGRESS of the schedule correctly', async () => {
    const { findAllByText } = render(
      <ScheduleItem
        schedule={mockedScheduleProgress}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const status = await findAllByText(mockedScheduleProgress.status);
    expect(status[0]).toBeInTheDocument();
  });

  it('should display the status PENDENT of the schedule correctly', async () => {
    const { findAllByText } = render(
      <ScheduleItem
        schedule={mockedSchedulePendent}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const status = await findAllByText(mockedSchedulePendent.status);
    expect(status[0]).toBeInTheDocument();
  });

  it('should display the status URGENT of the schedule correctly', async () => {
    const { findAllByText } = render(
      <ScheduleItem
        schedule={mockedScheduleUrgent}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const status = await findAllByText(mockedScheduleUrgent.status);
    expect(status[0]).toBeInTheDocument();
  });

  it('should display the status RESOLVED of the schedule correctly', async () => {
    const { findAllByText } = render(
      <ScheduleItem
        schedule={mockedScheduleResolved}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const status = await findAllByText(mockedScheduleResolved.status);
    expect(status[0]).toBeInTheDocument();
  });

  it('should display the description with less than 110 characters of the schedule correctly', async () => {
    const { findAllByText } = render(
      <ScheduleItem
        schedule={mockedSchedule}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const description = await findAllByText(mockedSchedule.description);
    expect(description[0]).toBeInTheDocument();
  });

  it('should display the description with more than 110 characters and no expanded of the schedule correctly', async () => {
    const { findAllByText } = render(
      <ScheduleItem
        schedule={mockedScheduleDescription}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const description = await findAllByText(
      `${mockedScheduleDescription.description.substring(0, 110)}...`
    );
    expect(description[0]).toBeInTheDocument();
  });

  it('should display the description with more than 110 characters and expanded of the schedule correctly', async () => {
    const { findAllByText, findByText } = render(
      <ScheduleItem
        schedule={mockedScheduleDescription}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const showMoreButton = await findByText('Mostrar mais');
    fireEvent.click(showMoreButton);

    const expandedDescription = await findAllByText(
      mockedScheduleDescription.description
    );
    expect(expandedDescription[0]).toBeInTheDocument();
  });

  it('should be able to edit a schedule', async () => {
    const { queryByLabelText } = render(
      <ScheduleItem
        schedule={mockedSchedule}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const EditButton = await queryByLabelText(
      `Editar ${mockedSchedule.status}`
    );
    if (EditButton) {
      fireEvent.click(EditButton);
      expect(mockedOnEditFunction).toHaveBeenCalled();
    }
  });

  it('should be able to delete a schedule', async () => {
    const { queryByLabelText } = render(
      <ScheduleItem
        schedule={mockedSchedule}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const deleteButton = queryByLabelText(`Excluir Agendamento`);
    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(mockedOnDeleteFunction).toHaveBeenCalledWith(mockedSchedule.id);
    }
  });
});
