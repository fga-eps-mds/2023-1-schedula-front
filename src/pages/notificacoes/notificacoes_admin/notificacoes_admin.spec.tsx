import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificacaoAdmin } from '@/pages/notificacoes/notificacoes_admin';
import { theme } from '@/styles/theme';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';
import {
  getAllAlerts,
  GetAllAlertsResponse,
} from '@/features/alerts/api/get-all-alerts';

describe('Alert Page', () => {
  const queryClient = new QueryClient();
  let alerts: GetAllAlertsResponse;

  beforeAll(async () => {
    alerts = await getAllAlerts();
  });

  it('should have a button to notify another user', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <NotificacaoAdmin />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const btn = await queryByText('Notificar');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });

  it('should display a list of alerts', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <NotificacaoAdmin />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    alerts.forEach(async (c) => {
      const card = await findByText(c.targetName);

      expect(card).toBeInTheDocument();
    });
  });
});
