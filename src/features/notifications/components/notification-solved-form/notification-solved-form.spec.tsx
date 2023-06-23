import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { NotificationSolvedForm } from '.';
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

describe('NotificationSolvedForm', () => {
  it('should be able to updtate notification to Solved', async () => {
    render(
      <NotificationSolvedForm
        defaultValues={mockedNotification}
        onSubmit={mockedOnSubmit}
        isSubmitting={false}
        onClose={() => {}}
      />
    );

    await act(async () => {
      screen.getByText('Confirmar').click();
    });

    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalled();
    });
  });
});
