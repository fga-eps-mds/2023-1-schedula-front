import { screen, render } from '@testing-library/react';
import { DeleteButton } from '.';

describe('DeleteButton', () => {
  it('has the correct aria-label', () => {
    render(<DeleteButton label="Reprovar" onClick={() => {}} />);
    expect(screen.getByText('Reprovar homologação')).toBeInTheDocument();
  });

  it('should be able to call DeleteButton onClick function', async () => {
    render(<DeleteButton label="Reprovar" onClick={() => {}} />);

    const button = screen.getByText('Reprovar homologação');

    expect(button).toBeInTheDocument();
  });
});
