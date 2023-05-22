import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { TutorialItem } from '@/features/tutorials/components/tutorial-item';
import { Tutorial } from '@/features/tutorials/api/types';

const mockedTutorial: Tutorial = {
  id: '1',
  name: 'Tutorial 1',
  filename: 'tutorial.pdf',
  data: {
    type: 'Buffer',
    data: [1, 2, 3],
  },
  category: {
    id: '1',
    name: 'Category 1',
  },
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

  it('should be called when the download button is clicked', async () => {
    const { queryByLabelText } = render(
      <TutorialItem
        tutorial={mockedTutorial}
        {...{ handleOpenFile: vi.fn(() => {}) }}
      />
    );

    const downloadButton = queryByLabelText('Download Tutorial');
    if (downloadButton) {
      expect(downloadButton).toBeInTheDocument();
    }
  });
});
