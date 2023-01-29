import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from '@/components/side-bar';
import { routes } from '@/constants/routes';

describe('Sidebar', () => {
  it('should display all routes', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <SideBar />
      </BrowserRouter>
    );

    let text;
    routes.forEach(async (r) => {
      text = await findByText(r.label);

      expect(text).toBeInTheDocument();
    });
  });
});
