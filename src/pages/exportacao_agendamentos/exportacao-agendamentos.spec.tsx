import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import jsPDF from 'jspdf';
import { ScheduleExport } from '@/pages/exportacao_agendamentos';
import { AuthProvider } from '@/contexts/AuthContext';
import { theme } from '@/styles/theme';
import 'jspdf-autotable';

const mockfunction = vi.fn(() => 'mocked function');
vi.mock('jspdf');
vi.mock('jspdf-autotable');

const queryClient = new QueryClient();

describe('ScheduleExport Page', () => {
  it('should be in the page', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
              <ScheduleExport />
            </ChakraProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await queryByText('Exportar');
    expect(btn).toBeInTheDocument();
  });
  it('should call handleExportSchedules function when export button is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <ScheduleExport />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const exportButton = getByText('Exportar');
    fireEvent.click(exportButton);
    expect(jsPDF).toHaveBeenCalled();
  });
});
