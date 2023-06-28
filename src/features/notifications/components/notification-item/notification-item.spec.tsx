import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { NotificationItem } from '@/features/notifications/components/notification-item';
import { Notification } from '../../types';

const mockedNotification: Notification = {
  id: '1',
  sourceEmail: 'email@gmail.com',
  sourceName: 'name',
  targetName: 'targetName',
  targetEmail: 'email1@gmail.com',
  message: 'message',
  status: 'pending',
  pendency: 'pending',
  read: false,
  createdAt: new Date(),
};

const mockedOnEdit = vi.fn(() => {});

describe('NotificationItem', () => {
  it('should render correctly status pending', async () => {
    const { queryByText } = render(
      <NotificationItem
        notification={mockedNotification}
        onEdit={mockedOnEdit}
      />
    );
    const messageResult = queryByText(mockedNotification.message);
    expect(messageResult).toBeInTheDocument();
  });

  it('should render correctly status solved', async () => {
    const { queryByText } = render(
      <NotificationItem
        notification={{ ...mockedNotification, status: 'solved' }}
        onEdit={mockedOnEdit}
      />
    );
    const messageResult = queryByText(mockedNotification.message);
    expect(messageResult).not.toBeInTheDocument();
  });

  it('should render correctly status unsolved', async () => {
    const { queryByText } = render(
      <NotificationItem
        notification={{ ...mockedNotification, status: 'unsolved' }}
        onEdit={mockedOnEdit}
      />
    );
    const messageResult = queryByText(mockedNotification.message);
    expect(messageResult).toBeInTheDocument();
  });

  it('should be able to set a notification as pending', async () => {
    const { queryByLabelText } = render(
      <NotificationItem
        notification={mockedNotification}
        onEdit={mockedOnEdit}
      />
    );
    const button = queryByLabelText('Adicionar pendencia');
    if (button) {
      fireEvent.click(button);
      expect(mockedOnEdit).toHaveBeenCalledWith(mockedNotification, 'pending');
    }
  });

  it('should be able to set a notification as solved', async () => {
    const { queryByLabelText } = render(
      <NotificationItem
        notification={mockedNotification}
        onEdit={mockedOnEdit}
      />
    );
    const button = queryByLabelText('Marcar como resolvido');
    if (button) {
      fireEvent.click(button);
      expect(mockedOnEdit).toHaveBeenCalledWith(mockedNotification, 'solved');
    }
  });
});
