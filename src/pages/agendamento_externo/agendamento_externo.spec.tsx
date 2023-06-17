import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { RegistrarAgendamento } from './index';
import { AuthProvider } from '@/contexts/AuthContext';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';

describe('Agendamento Page', () => {
  const queryClient = new QueryClient();

  it('should have a page external', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <RegistrarAgendamento />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const pageTitle = screen.getByText('Novo Agendamento');
    expect(pageTitle).toBeInTheDocument();
  });
});
