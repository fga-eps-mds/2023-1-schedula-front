import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Cities } from '@/pages/cidades';
import { theme } from '@/styles/theme';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';
import { getAllCities } from '@/features/cities/api/get-all-cities';

describe('Cities Page', () => {
  const queryClient = new QueryClient();

  it('should have a button', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Cities />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await findByText('Nova Cidade');

    expect(btn).toBeInTheDocument();
  });

  it('should display a list of cities', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Cities />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const cities = await getAllCities();

    cities.forEach(async (c) => {
      const card = await findByText(c.name);

      expect(card).toBeInTheDocument();
    });
  });
});
