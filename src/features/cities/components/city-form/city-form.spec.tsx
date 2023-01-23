import { screen, render, waitFor, act, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CityForm } from '.';

const city: City = {id: '1', name: 'Goiânia', state: 'Goiás'}

describe('CityForm', () => {
  it("should have the correct data", () => {
    render(<CityForm defaultValues={city} onSubmit={() => {}} isSubmitting={false} />);
  
    expect(screen.getByLabelText("Nome")).toHaveValue("Goiânia");
    expect(screen.getByLabelText("Estado")).toHaveValue("Goiás");
  })

  it("should be able to update a city", async () => {
    const handleSubmit = vi.fn();
    render(<CityForm defaultValues={city} onSubmit={handleSubmit} isSubmitting={false} />);

    await act( async () => screen.getByText('Salvar').click())
  
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    })
  });

  it("should be able to create a city", async () => {
    const handleSubmit = vi.fn();
    render(<CityForm onSubmit={handleSubmit} isSubmitting={false} />);

    await act( async () => {
      fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Goiânia' } })
      fireEvent.change(screen.getByLabelText('Estado'), { target: { value: 'Goiás' } })

      screen.getByText('Criar cidade').click()
    })
  
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    })
  });
});
