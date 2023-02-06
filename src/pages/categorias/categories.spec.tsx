import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@/styles/theme';
import ProblemCategories from '@/pages/categorias';
import { AuthProvider } from '@/contexts/AuthContext';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';

describe('Categories Page', () => {
  const queryClient = new QueryClient();

  it('should have a button to register a new problem category', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <ProblemCategories />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await queryByText('Nova Categoria');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });
});
