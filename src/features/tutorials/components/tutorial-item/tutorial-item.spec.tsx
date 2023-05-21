import { render } from '@testing-library/react';
import { TutorialItem } from '@/features/tutorials/components/tutorial-item';

const mockedTutorial: Tutorial = {
  name: 'Tutorial 1',
  category: {
    name: 'Category 1',
  },
  data: {
    data: [1, 2, 3],
  },
  filename: 'tutorial.pdf',
};

describe('TutorialItem', () => {
  it('should render tutorial name and category', async () => {
    const { findAllByText } = render(
      <TutorialItem tutorial={mockedTutorial} />
    );

    const tutorialName = await findAllByText('Tutorial 1');
    expect(tutorialName[0]).toBeInTheDocument();

    const tutorialCategory = await findAllByText('Category 1');
    expect(tutorialCategory[0]).toBeInTheDocument();
  });
});
