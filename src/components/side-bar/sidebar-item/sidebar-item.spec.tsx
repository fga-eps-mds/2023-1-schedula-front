import { fireEvent, render } from '@testing-library/react';
import { FiAlertCircle } from 'react-icons/fi';
import { BrowserRouter } from 'react-router-dom';
import { SideBarItem } from '@/components/side-bar/sidebar-item';

describe('Sidebar-item', () => {
  const mock = {
    label: 'mock label',
    pathname: 'mock_pathname',
    icon: FiAlertCircle,
  };

  it('should display correct route name', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <SideBarItem {...mock} />
      </BrowserRouter>
    );

    const text = await findByText(mock.label);
    expect(text).toBeInTheDocument();
  });

  it('should go to a correct path', async () => {
    const { findByRole } = render(
      <BrowserRouter>
        <SideBarItem {...mock} />
      </BrowserRouter>
    );

    const link = await findByRole('link');
    fireEvent.click(link);

    expect(window.location.pathname).toEqual(`/${mock.pathname}`);
  });
});
