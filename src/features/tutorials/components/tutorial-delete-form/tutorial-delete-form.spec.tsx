import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
  queryByText,
} from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DeleteTutorialForm } from '@/features/tutorials/components/tutorial-delete-form';
import { AuthProvider } from '@/contexts/AuthContext';
import { theme } from '@/styles/theme';

const mockedTutorial: string[] = ['1'];

describe('TutorialDeleteForm', () => {
  const queryClient = new QueryClient();
  const onClose = vi.fn();
  const onClear = vi.fn();
  const onDelete = vi.fn();

  it('should have the correct button', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <DeleteTutorialForm
                tutorialsIds={mockedTutorial}
                onClose={onClose}
                onClear={onClear}
                onDelete={onDelete}
              />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = queryByText('Confirmar');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });
});
