import { screen, render, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { CategoriaForm } from '@/features/problem/problem-categories/components/categoria-form';

const category: Category = {
  id: '1',
  description: 'Descrição da Categoria',
  name: 'Categoria',
  visible_user_external: false,
};

describe('CategoriaForm', () => {
  it('should have the correct data', () => {
    render(
      <CategoriaForm
        defaultValues={category}
        onSubmit={() => {}}
        isSubmitting={false}
      />
    );

    expect(screen.getByLabelText('Nome')).toHaveValue('Categoria');
    expect(screen.getByLabelText('Descrição')).toHaveValue(
      'Descrição da Categoria'
    );
  });

  it('should be able to call CategoriaForm handleSubmit function', async () => {
    const handleSubmit = vi.fn();
    render(
      <CategoriaForm
        defaultValues={category}
        onSubmit={handleSubmit}
        isSubmitting={false}
      />
    );

    await act(async () => screen.getByText('Registrar').click());

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
