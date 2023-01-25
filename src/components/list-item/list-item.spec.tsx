import { render } from '@testing-library/react';
import { Item } from '@/components/list-item';

describe('ListItem', () => {
  it('should display item data', async () => {
    const mock = {
      title: 'mock title',
      description: 'mock descpition',
    };

    const { findByText } = render(<Item {...mock} />);

    const title = await findByText(mock.title);
    const description = await findByText(mock.description);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
