import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { CategoryTutorialForm } from '.';

const categoryTutorial: CategoryTutorial = {
  id: '1',
  name: 'Rede',
};

describe('CategoryTutorialForm', () => {
  it('should have the correct data', () => {
    render(
      <CategoryTutorialForm
        defaultValues={categoryTutorial}
        onSubmit={() => {}}
        isSubmitting={false}
      />
    );

    expect(screen.getByLabelText('Nome')).toHaveValue('Rede');
  });

  it('should be able to update a category', async () => {
    const handleSubmit = vi.fn();
    render(
      <CategoryTutorialForm
        defaultValues={categoryTutorial}
        onSubmit={handleSubmit}
        isSubmitting={false}
      />
    );

    await act(async () => screen.getByText('Salvar').click());

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it('should be able to create a categoryTutorial', async () => {
    const handleSubmit = vi.fn();
    render(
      <CategoryTutorialForm onSubmit={handleSubmit} isSubmitting={false} />
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Nome'), {
        target: { value: 'Rede' },
      });
      screen.getByText('Criar categoria').click();
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
