import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { NotificationForm } from '.';
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

const mockedOnSubmit = vi.fn(() => {});

describe('NotificationForm', () => {
  it('should be able to updtate notification to pending', async () => {
    render(
      <NotificationForm
        defaultValues={mockedNotification}
        onSubmit={mockedOnSubmit}
        isSubmitting={false}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Adicione uma pendência'), {
        target: { value: 'pendency' },
      });
      screen.getByText('Adicionar').click();
    });

    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalled();
    });
  });
});
