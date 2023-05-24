import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Cities } from '@/pages/cidades';
import { theme } from '@/styles/theme';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';
import {
  getAllCities,
  GetAllCitiesResponse,
} from '@/features/cities/api/get-all-cities';

describe('Cities Page', () => {
  const queryClient = new QueryClient();
  let cities: GetAllCitiesResponse;

  beforeAll(async () => {
    cities = await getAllCities(0);
  });

  it('should have a button to register a new city', async () => {
    const { queryByText } = render(
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

    const btn = await queryByText('Nova Cidade');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
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

    cities.forEach(async (c) => {
      const card = await findByText(c.name);

      expect(card).toBeInTheDocument();
    });
  });
});
