import { FaSearch } from 'react-icons/fa';
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { PageHeader } from '@/components/page-header';
import { Notification } from '@/features/notifications/api/types';
import { NotificationItem } from '@/features/notifications/components/notification-item';
import { useGetAllNotification } from '@/features/notifications/api/get-all-notifications';
import { ListView } from '@/components/list';

export function NotificacaoUsuario() {
  const { data: notifications, isLoading } = useGetAllNotification();

  const renderNotificationItem = useCallback(
    (notification: Notification) => (
      <NotificationItem notification={notification} />
    ),
    []
  );

  return (
    <>
      <PageHeader title="Notificações" />

      <Grid>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} boxSize={4} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Pesquisar notificações"
            _placeholder={{ color: 'gray.400' }}
          />
        </InputGroup>
      </Grid>

      <ListView<Notification>
        items={notifications}
        render={renderNotificationItem}
        isLoading={isLoading}
      />
    </>
  );
}
