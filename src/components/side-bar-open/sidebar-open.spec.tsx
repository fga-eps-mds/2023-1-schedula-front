import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SideBarOpen } from '@/components/side-bar-open';
import { routes } from '@/constants/routes';

describe('Sidebar', () => {
  it('should display all routes', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <SideBarOpen />
      </BrowserRouter>
    );

    let text;
    routes.forEach(async (r) => {
      text = await findByText(r.label);

      expect(text).toBeInTheDocument();
    });
  });
});
