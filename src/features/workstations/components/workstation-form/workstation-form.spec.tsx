import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { WorkstationForm } from '.';
import { Workstation } from '../../api/types';
import { AuthProvider } from '@/contexts/AuthContext';
import { theme } from '@/styles/theme';
import { DeleteWorkstationForm } from './delete-workstation-form';

const workstation: Workstation = {
  id: '1',
  name: 'Goiais', // Obrigatorio
  city: {
    id: '1',
    name: 'Goiais',
    state: 'GO',
  }, // obrigatorio
  phone: '61983320355', // Obrigatorio
  vpn: false,
  ip: '1.3.2.4 ~ 1.2.3.4',
  is_regional: false,
  gateway: '1.1.1.1', // Obrigatorio
};

const queryClient = new QueryClient();

describe('WorkstationForm', () => {
  it('should have an input for the forms', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <WorkstationForm
                selectedWorkstation={workstation}
                onSubmit={() => {}}
                isSubmitting={false}
              />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument();
    expect(screen.getByLabelText('Faixa - Início')).toBeInTheDocument();
    expect(screen.getByLabelText('Faixa - Fim')).toBeInTheDocument();
    expect(screen.getByLabelText('Gateway')).toBeInTheDocument();
    expect(screen.getByLabelText('VPN')).toBeInTheDocument();
  });

  it('renders the form with initial values', () => {
    const selectedWorkstation = {
      ...workstation,
      is_regional: true,
    };

    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <WorkstationForm
                selectedWorkstation={selectedWorkstation}
                onSubmit={() => {}}
                isSubmitting={false}
              />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Nome')).toHaveValue('Goiais');
    expect(screen.getByLabelText('Telefone')).toHaveValue('61983320355');
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument();
    expect(screen.getByLabelText('Faixa - Início')).toHaveValue('1.3.2.4');
    expect(screen.getByLabelText('Faixa - Fim')).toHaveValue('1.2.3.4');
    expect(screen.getByLabelText('Gateway')).toHaveValue('1.1.1.1');
    expect(screen.getByLabelText('VPN')).not.toBeChecked();
    expect(screen.getByLabelText('Regional')).toBeChecked();
  });

  it('should able to delete a workstation', async () => {
    const onSubmit = vi.fn();

    const selectedWorkstation = {
      name: 'Goiais',
      id: '1',
      destination: { label: 'Goiais', value: '1' },
    } as any;

    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <DeleteWorkstationForm
                defaultValues={selectedWorkstation}
                onSubmit={onSubmit}
                isSubmitting={false}
              />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Salvar'));
    });

    await waitFor(() => {
      expect(onSubmit).toBeCalled();
    });
  });
});
