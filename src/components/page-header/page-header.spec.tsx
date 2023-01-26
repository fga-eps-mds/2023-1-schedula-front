import { screen, render } from '@testing-library/react';
import { PageHeader } from '.';

describe('CategoriaForm', () => {
  it('has the correct data', () => {
    render(
      <PageHeader title="Título" subtitle="Subtítulo" children="Children" />
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Título');
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
