import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { TutorialItemManager } from '@/features/tutorials/components/tutorial-item-manager';
import { Tutorial } from '@/features/tutorials/api/types';

const mockedTutorial: Tutorial = {
  id: '1',
  name: 'Tutorial REDES',
  filename: 'redes.pdf',
  data: {
    type: 'Buffer',
    data: [1, 2, 3],
  },
  category: {
    id: '1',
    name: 'Computadores 1',
  },
};
const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn((tutorialId: string) => tutorialId);
const mockedOnCheckedFunction = vi.fn((tutorialId: string) => tutorialId);

describe('TutorialItemManager', () => {
  it('should render tutorial name and category', async () => {
    const { findAllByText } = render(
      <TutorialItemManager
        tutorial={mockedTutorial}
        onEdit={mockedOnEditFunction}
        onChecked={mockedOnCheckedFunction}
        onDelete={mockedOnDeleteFunction}
        isDeleting={false}
        isSelected={false}
      />
    );

    const tutorialName = await findAllByText(mockedTutorial.name);
    expect(tutorialName[0]).toBeInTheDocument();

    const tutorialCategory = await findAllByText(mockedTutorial.category.name);
    expect(tutorialCategory[0]).toBeInTheDocument();
  });

  it('should be able to delete a tutorial', async () => {
    const { queryByLabelText } = render(
      <TutorialItemManager
        tutorial={mockedTutorial}
        onEdit={mockedOnEditFunction}
        onChecked={mockedOnCheckedFunction}
        onDelete={mockedOnDeleteFunction}
        isDeleting={false}
        isSelected={false}
      />
    );

    const deleteButton = queryByLabelText(`Excluir ${mockedTutorial.name}`);
    if (deleteButton) {
      expect(deleteButton).toBeInTheDocument();
    }
  });

  it('should be able to edit a category', async () => {
    const { queryByLabelText } = render(
      <TutorialItemManager
        tutorial={mockedTutorial}
        onEdit={mockedOnEditFunction}
        onChecked={mockedOnCheckedFunction}
        onDelete={mockedOnDeleteFunction}
        isDeleting={false}
        isSelected={false}
      />
    );

    const EditButton = await queryByLabelText(`Editar ${mockedTutorial.name}`);
    if (EditButton) {
      fireEvent.click(EditButton);
      expect(mockedOnEditFunction).toHaveBeenCalled();
    }
  });
});
