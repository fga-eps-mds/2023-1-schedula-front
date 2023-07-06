import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { theme } from '@/styles/theme';
import { UserForm } from '.';
import { AuthProvider } from '@/contexts/AuthContext';
import { User } from '../../api/types';

const queryClient = new QueryClient();
const mockSubmit = vi.fn();

const mockUser: User = {
  name: 'teste',
  id: '1',
  email: 'teste@gmail.com',
  username: 'teste',
  position: 'tech',
  profile: 'USER',
  cpf: '7338229104',
  createdAt: '1710',
  updatedAt: '1710',
};

describe('UserForm Component', () => {
  it('should display save button', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <UserForm
                onSubmit={mockSubmit}
                isSubmitting={false}
                defaultValues={mockUser}
              />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = queryByText('Salvar');
    expect(btn).toBeInTheDocument();
  });

  it('form inputs should be in the page', () => {
    const { queryByLabelText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <UserForm onSubmit={mockSubmit} isSubmitting={false} />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const nameInput = queryByLabelText('Nome Completo');
    expect(nameInput).toBeInTheDocument();
  });
});
