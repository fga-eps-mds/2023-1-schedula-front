import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Tutoriais } from '@/pages/tutoriais';
import { theme } from '@/styles/theme';
import {
  getAllTutorials,
  GetAllTutorialsResponse,
} from '@/features/tutorials/api/get-all-tutorials';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';
import { Tutorial } from '@/features/tutorials/api/types';

describe('Tutoriais Page', () => {
  const queryClient = new QueryClient();
  let tutorials: GetAllTutorialsResponse;

  beforeAll(async () => {
    tutorials = await getAllTutorials();
  });

  it('should have an input for searching tutorials', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Tutoriais />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Pesquisar tutoriais');
    expect(searchInput).toBeInTheDocument();
  });

  it('should display a list of tutorials', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Tutoriais />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    tutorials.forEach(async (tutorial: Tutorial) => {
      const tutorialName = screen.getByText(tutorial.name);
      expect(tutorialName).toBeInTheDocument();
    });
  });

  it('should have a select for filtering tutorials by category', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Tutoriais />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const selectElement = screen.getByLabelText('Filtrar por categoria');
    expect(selectElement).toBeInTheDocument();
  });
});
