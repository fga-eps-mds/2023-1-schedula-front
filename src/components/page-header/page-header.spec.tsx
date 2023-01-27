import { screen, render } from '@testing-library/react';
import { PageHeader } from '.';

describe('PageHeader', () => {
  it('has the correct data', () => {
    render(
      <PageHeader title="Titulo" subtitle="Subtitulo">
        <p>Children</p>
      </PageHeader>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Titulo');
    expect(screen.getByText('Subtitulo')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
