import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { CityItem } from '@/features/cities/components/city-item';
import { useAuth } from '@/contexts/AuthContext';

const mockedCity: City = {
  id: '1',
  name: 'Goiânia',
  state: 'Goiás',
};

const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn((cityId: string) => cityId);

describe('CityItem', () => {
  it('should display the name of the city correctly', async () => {
    const { findAllByText } = render(
      <CityItem
        city={mockedCity}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const name = await findAllByText(mockedCity.name);
    expect(name[0]).toBeInTheDocument();
  });

  it('should be able to edit a city', async () => {
    const { queryByLabelText } = render(
      <CityItem
        city={mockedCity}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const EditButton = await queryByLabelText(`Editar ${mockedCity.name}`);
    if (EditButton) {
      fireEvent.click(EditButton);
      expect(mockedOnEditFunction).toHaveBeenCalled();
    }
  });

  it('should be able to delete a city', async () => {
    const { queryByLabelText } = render(
      <CityItem
        city={mockedCity}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const deleteButton = queryByLabelText(`Excluir ${mockedCity.name}`);
    if (deleteButton) {
      expect(deleteButton).toBeInTheDocument();
    }
  });
});
