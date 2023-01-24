import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { User } from '@/features/users/api/types';
import { UserForm } from '.';

const user: User = {
  id: '1',
  email: 'email@email.com',
  name: 'Usuário Teste',
  username: 'testuser',
  position: 'abc',
  profile: 'BASIC',
  createdAt: '31/02/1990',
  updatedAt: '32/02/1990',
};

describe('UserForm', () => {
  it('should have the correct data', () => {
    render(
      <UserForm defaultValues={user} onSubmit={() => {}} isSubmitting={false} />
    );

    /*  expect(screen.getByLabelText('Nome')).toHaveValue('Goiânia');
    expect(screen.getByLabelText('Estado')).toHaveValue('Goiás'); */
  });

  it('should be able to update a city', async () => {
    const handleSubmit = vi.fn();
    render(
      <UserForm
        defaultValues={user}
        onSubmit={handleSubmit}
        isSubmitting={false}
      />
    );

    await act(async () => screen.getByText('Salvar').click());

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  /* it('should be able to create a city', async () => {
    const handleSubmit = vi.fn();
    render(<CityForm onSubmit={handleSubmit} isSubmitting={false} />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Nome'), {
        target: { value: 'Goiânia' },
      });
      fireEvent.change(screen.getByLabelText('Estado'), {
        target: { value: 'Goiás' },
      });

      screen.getByText('Criar cidade').click();
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  }); */
});
