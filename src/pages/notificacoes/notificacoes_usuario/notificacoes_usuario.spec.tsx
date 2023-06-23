import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { findByText, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificacaoUsuario } from '.';
import { theme } from '@/styles/theme';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intersection-observer';
import {
  getAllNotifications,
  GetAllNotificationsResponse,
} from '@/features/notifications/api/get-all-notifications';
import { Notification } from '@/features/notifications/types';

describe('UserNotificationsPage', async () => {
  const queryClient = new QueryClient();
  let notifications: GetAllNotificationsResponse;

  beforeAll(async () => {
    notifications = await getAllNotifications();
  });

  it('should display a header', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <NotificacaoUsuario />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const header = await findByText('Notificações');
    expect(header).toBeInTheDocument();
  });

  it('should display a list of notifications', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <NotificacaoUsuario />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    notifications.forEach(async (notification: Notification) => {
      if (notification.targetEmail === 'teste@gmail.com') {
        const card = await findByText(notification.message);
        expect(card).toBeInTheDocument();
      } else {
        const card = await findByText(notification.message);
        expect(card).not.toBeInTheDocument();
      }
    });
  });

  it('should filter notification by search', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <NotificacaoUsuario />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Pesquisar notificações');
    fireEvent.change(searchInput, { target: { value: 'teste' } });
    notifications.forEach(async (notification: Notification) => {
      const notificationMessage = screen.getByText(notification.message);
      if (notification.message.toLowerCase().includes('teste')) {
        expect(notificationMessage).toBeInTheDocument();
      } else {
        expect(notificationMessage).not.toBeInTheDocument();
      }
    });
  });
});
