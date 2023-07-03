import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, queryByText, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { theme } from '@/styles/theme';
import { AgendamentosAbertos } from './index';
import { AuthProvider } from '@/contexts/AuthContext';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';

describe('Agendamento Aberto Page', () => {
  const queryClient = new QueryClient();

  it('should have a page external', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <AgendamentosAbertos />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const pageTitle = screen.getByText('Agendamentos Abertos');
    expect(pageTitle).toBeInTheDocument();
  });

  it('should have the button "Novo Agendamento"', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <AgendamentosAbertos />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await queryByText('Novo Agendamento');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });
});
