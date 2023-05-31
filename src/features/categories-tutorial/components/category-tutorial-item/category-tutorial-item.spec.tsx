import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { CategoryTutorialItem } from '@/features/categories-tutorial/components/category-tutorial-item';
import { CategoryTutorial } from '../../types';

const mockedCategoryTutorial: CategoryTutorial = {
  id: '1',
  name: 'Rede',
};

const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn(
  (categoryTutorialId: string) => categoryTutorialId
);

describe('CategoryTutorialItem', () => {
  it('should display the name of the category correctly', async () => {
    const { findAllByText } = render(
      <CategoryTutorialItem
        categoryTutorial={mockedCategoryTutorial}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const name = await findAllByText(mockedCategoryTutorial.name);
    expect(name[0]).toBeInTheDocument();
  });

  it('should be able to edit a category', async () => {
    const { queryByLabelText } = render(
      <CategoryTutorialItem
        categoryTutorial={mockedCategoryTutorial}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const EditButton = await queryByLabelText(
      `Editar ${mockedCategoryTutorial.name}`
    );
    if (EditButton) {
      fireEvent.click(EditButton);
      expect(mockedOnEditFunction).toHaveBeenCalled();
    }
  });

  it('should be able to delete a category', async () => {
    const { queryByLabelText } = render(
      <CategoryTutorialItem
        categoryTutorial={mockedCategoryTutorial}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const deleteButton = queryByLabelText(
      `Excluir ${mockedCategoryTutorial.name}`
    );
    if (deleteButton) {
      expect(deleteButton).toBeInTheDocument();
    }
  });
});
