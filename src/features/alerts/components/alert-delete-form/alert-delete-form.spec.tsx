import { screen, render, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { DeleteAlertForm } from '.';

const mockedOnClose = vi.fn(() => {});
const mockedOnClear = vi.fn(() => {});
const mockedOnDelete = vi.fn(() => {});

describe('DeleteAlertForm', () => {
  it('should be able to delete alert', async () => {
    render(
      <DeleteAlertForm
        onClose={mockedOnClose}
        onClear={mockedOnClear}
        onDelete={mockedOnDelete}
      />
    );

    await act(async () => {
      screen.getByText('Confirmar').click();
    });

    await waitFor(() => {
      expect(mockedOnDelete).toHaveBeenCalled();
    });
  });

  it('should be able to cancel the delete alert option', async () => {
    render(
      <DeleteAlertForm
        onClose={mockedOnClose}
        onClear={mockedOnClear}
        onDelete={mockedOnDelete}
      />
    );

    await act(async () => {
      screen.getByText('Cancelar').click();
    });

    await waitFor(() => {
      expect(mockedOnDelete).toHaveBeenCalled();
    });
  });
});
