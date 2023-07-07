import { fireEvent, render } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '@/contexts/AuthContext';
import { CreateIssueForm } from './create-issue-form';
import { useGetProblemCategory } from '@/features/problem/api/get-problem-category';

const queryClient = new QueryClient();

describe('CreateIssueForm', () => {
  it('should display a requester input', () => {
    const { queryByLabelText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <CreateIssueForm />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const requesterInput = queryByLabelText('Solicitante');
    expect(requesterInput).toBeInTheDocument();
  });
  it('should display a Registrar Atendimento button', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <CreateIssueForm />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const btn = queryByText('Registrar Atendimento');
    expect(btn).toBeInTheDocument();
  });
});
