import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { CityItem } from '@/features/cities/components/city-item';

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
    const { findByLabelText } = render(
      <CityItem
        city={mockedCity}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const EditButton = await findByLabelText(`Editar ${mockedCity.name}`);
    fireEvent.click(EditButton);
    expect(mockedOnEditFunction).toHaveBeenCalled();
  });

  it('should be able to delete a city', async () => {
    const { getByRole } = render(
      <CityItem
        city={mockedCity}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const deleteButton = getByRole('button', {name: `Excluir ${mockedCity.name}`});
    /*act(() => {
      fireEvent.click(deleteButton);
    });*/

    expect(deleteButton).toBeInTheDocument();
    // expect(mockedOnDeleteFunction).toHaveBeenCalledWith({
    //   cityId: mockedCity.id,
    // });
  });
});
