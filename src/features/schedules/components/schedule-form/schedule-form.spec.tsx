import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { theme } from '@/styles/theme';
import { ScheduleForm } from '.';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

const mockSubmit = vi.fn();

describe('ScheduleForm Component', () => {
  it('form inputs should be in the page', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <ScheduleForm onSubmit={mockSubmit} isSubmitting={false} />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = queryByText('Agendar Serviço');
    expect(btn).toBeInTheDocument();
  });
});
