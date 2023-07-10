import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { AlertItemManager } from '.';
import { Alert } from '../../type';

const mockedNotification: Alert = {
  id: '1',
  sourceEmail: 'email@gmail.com',
  sourceName: 'name',
  targetName: 'targetName',
  targetEmail: 'email1@gmail.com',
  message: 'message',
  status: 'unsolved',
  pendency: 'pending',
  read: false,
  createdAt: new Date(),
};

const mockedNotificationSolved = {
  ...mockedNotification,
  status: 'solved',
  read: true,
};

const mockedNotificationPending = {
  ...mockedNotification,
  status: 'pending',
  read: true,
};

const mockedOnDelete = vi.fn(() => {});

describe('AlertItemManager', () => {
  it('should render correctly', async () => {
    render(
      <AlertItemManager
        alert={mockedNotification}
        onDelete={mockedOnDelete}
        isDeleting={false}
      />
    );

    const targetNameResult = screen.getByText(mockedNotification.targetName);
    expect(targetNameResult).toBeInTheDocument();
  });

  it('should render correctly status pending', async () => {
    render(
      <AlertItemManager
        alert={mockedNotificationPending}
        onDelete={mockedOnDelete}
        isDeleting={false}
      />
    );

    const targetNameResult = screen.getByText(
      mockedNotificationPending.targetName
    );
    expect(targetNameResult).toBeInTheDocument();
  });

  it('should render correctly status solved', async () => {
    render(
      <AlertItemManager
        alert={mockedNotificationSolved}
        onDelete={mockedOnDelete}
        isDeleting={false}
      />
    );

    const targetNameResult = screen.queryByText(
      mockedNotificationSolved.targetName
    );
    expect(targetNameResult).toBeInTheDocument();
  });

  it('should be able to delete a alert', async () => {
    const { queryByLabelText } = render(
      <AlertItemManager
        alert={mockedNotification}
        onDelete={mockedOnDelete}
        isDeleting={false}
      />
    );

    const button = queryByLabelText('Alerta');
    if (button) {
      fireEvent.click(button);
      expect(mockedOnDelete).toHaveBeenCalledWith();
    }
  });
});
