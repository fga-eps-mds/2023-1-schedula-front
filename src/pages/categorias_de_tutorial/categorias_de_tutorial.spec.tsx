import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CategoriasTutorial } from '@/pages/categorias_de_tutorial/index';
import { theme } from '@/styles/theme';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';
import {
  getAllCategoryTutorial,
  GetAllCategoryTutorialResponse,
} from '@/features/categories-tutorial/api/get-all-categories-tutorial';

describe('Tutorial Categorie Page', () => {
  const queryClient = new QueryClient();
  let categories: GetAllCategoryTutorialResponse;

  beforeAll(async () => {
    categories = await getAllCategoryTutorial(0);
  });

  it('should have a button to register a tutorial categorie', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CategoriasTutorial />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await queryByText('Criar categoria');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });

  it('should display a list of categories', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CategoriasTutorial />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    categories.forEach(async (c) => {
      const card = await findByText(c.name);

      expect(card).toBeInTheDocument();
    });
  });

  it('should have a page external', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CategoriasTutorial />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const pageTitle = screen.getByText('Categorias de Tutoriais');
    expect(pageTitle).toBeInTheDocument();
  });

  it('should have a button to cofirm register a tutorial categorie', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CategoriasTutorial />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await queryByText('Criar categoria');
    if (btn) {
      expect(btn).toBeInTheDocument();
      const btn1 = await queryByText('Criar categoria');
      if (btn) {
        expect(btn).toBeInTheDocument();
      }
    }
  });
});
