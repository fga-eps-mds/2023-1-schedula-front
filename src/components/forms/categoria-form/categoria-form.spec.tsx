import { screen, render, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { CategoriaForm } from '.';

const category: Category = {
  id: 1,
  active: true,
  description: 'Descrição da Categoria',
  updated_at: new Date(),
  name: 'Categoria',
};

describe('CategoriaForm', () => {
  it('should have the correct data', () => {
    render(<CategoriaForm defaultValues={category} onSubmit={() => {}} />);

    expect(screen.getByLabelText('Nome')).toHaveValue('Categoria');
    expect(screen.getByLabelText('Descrição')).toHaveValue(
      'Descrição da Categoria'
    );
  });

  it('should be able to call CategoriaForm handleSubmit function', async () => {
    const handleSubmit = vi.fn();
    render(<CategoriaForm defaultValues={category} onSubmit={handleSubmit} />);

    await act(async () => screen.getByText('Registrar').click());

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
