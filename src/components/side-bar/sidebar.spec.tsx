import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SideBar } from '@/components/side-bar';
import { routes } from '@/constants/routes';

const queryClient = new QueryClient();

describe('Sidebar', () => {
  it('should display all routes', async () => {
    const { findByText } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </QueryClientProvider>
    );

    let text;
    routes.forEach(async (r) => {
      text = await findByText(r.label);

      expect(text).toBeInTheDocument();
    });
  });
});
