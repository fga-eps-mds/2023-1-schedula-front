import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { CreateIssueForm } from './create-issue-form-open';
import { AuthProvider } from '@/contexts/AuthContext';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';

describe('renders form fields correctly', () => {
  const queryClient = new QueryClient();

  it('should have an input for the forms', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CreateIssueForm />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Solicitante')).toBeInTheDocument();
    expect(screen.getByLabelText('Celular')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument();
    expect(screen.getByLabelText('Posto de Trabalho')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
    expect(screen.getByLabelText('Categoria do Problema')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipos de Problema')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição do Problema')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CreateIssueForm />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Solicitante'), {
      target: { value: 'Mocked Requester' },
    });
    fireEvent.change(screen.getByLabelText('Celular'), {
      target: { value: '61123456789' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'mock.@policiacivil.go.gov.br' },
    });
    fireEvent.change(screen.getByLabelText('Cidade'), {
      target: { value: 'Mocked City' },
    });
    fireEvent.change(screen.getByLabelText('Posto de Trabalho'), {
      target: { value: 'Mocked Workstation' },
    });
    fireEvent.change(screen.getByLabelText('Telefone'), {
      target: { value: '12345678912' },
    });
    fireEvent.change(screen.getByLabelText('Categoria do Problema'), {
      target: { value: 'Mocked Problem Categorie' },
    });
    fireEvent.change(screen.getByLabelText('Tipos de Problema'), {
      target: { value: 'Mocked Problem Types' },
    });
    fireEvent.change(screen.getByLabelText('Descrição do Problema'), {
      target: { value: 'Mocked Problem Description' },
    });
    fireEvent.click(screen.getByText('Registrar Agendamento'));
  });

  it('displays a validation error message for invalid email format', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CreateIssueForm />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'Formato invalido' },
    });

    fireEvent.click(screen.getByText('Registrar Agendamento'));
    expect(
      screen.getByLabelText('Formato de e-mail inválido')
    ).toBeInTheDocument();
  });
});
