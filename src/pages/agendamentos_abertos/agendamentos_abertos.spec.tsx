import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('onClick is called when "Novo Agendamento" button is clicked', () => {
    const mockOnClick = vi.fn();

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

    const novoAgendamentoButton = screen.getByText('Novo Agendamento');

    fireEvent.click(novoAgendamentoButton);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
