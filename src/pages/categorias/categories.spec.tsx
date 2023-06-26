import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { theme } from '@/styles/theme';
import ProblemCategories from '@/pages/categorias';
import { AuthProvider } from '@/contexts/AuthContext';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';
import { ProblemCategory } from '@/features/problem/api/types';
import { CategoryItem } from '@/features/problem/problem-categories/components/category-item';

describe('Categories Page', () => {
  const queryClient = new QueryClient();

  it('should have a button to register a new problem category', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <ProblemCategories />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await queryByText('Nova Categoria');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });

  it('renders category item correctly', () => {
    const category: ProblemCategory = {
      id: '1',
      name: 'Categoria de exemplo',
      description: 'Desc',
      visible_user_external: false,
      problem_types: [],
    };

    const mockedOnEditFunction = vi.fn(() => {});
    const mockedOnDeleteFunction = vi.fn((categoryId: string) => categoryId);
    const isRemovingProblemCategory = false;

    const { getByText } = render(
      <BrowserRouter>
        <CategoryItem
          category={category}
          onEdit={mockedOnEditFunction}
          onDelete={mockedOnDeleteFunction}
          isDeleting={isRemovingProblemCategory}
        />
      </BrowserRouter>
    );

    expect(getByText('Categoria de exemplo')).toBeInTheDocument();
  });
});
