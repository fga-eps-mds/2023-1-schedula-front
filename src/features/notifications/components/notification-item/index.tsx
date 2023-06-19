import { AiFillCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { Box, Text } from '@chakra-ui/react';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { ActionButton } from '@/components/action-buttons';
import { Notification } from '../../types';
import { formatDate } from '@/utils/format-date';

interface NotificationItemProps {
  notification: Notification;
  onEdit: (
    notification: Notification,
    notificationStatus: 'pending' | 'solved'
  ) => void;
}

export function NotificationItem({
  notification,
  onEdit,
}: NotificationItemProps) {
  if (notification.status === 'solved') return null;

  return (
    <Item
      title={notification.message}
      description={
        <Box display="flex" gap={2}>
          <Box textAlign="center" fontWeight="medium">
            <Text fontSize="sm" fontWeight="light" color="GrayText">
              Usuário
            </Text>
            <Text>{notification.sourceName}</Text>
          </Box>
          <Box textAlign="center" fontWeight="medium">
            <Text fontSize="sm" fontWeight="light" color="GrayText">
              Data
            </Text>
            <Text>{formatDate(notification?.createdAt, 'date')} </Text>
          </Box>
          <Box textAlign="center" fontWeight="medium">
            <Text fontSize="sm" fontWeight="light" color="GrayText">
              Hora
            </Text>
            <Text>{formatDate(notification?.createdAt, 'time')}</Text>
          </Box>
        </Box>
      }
    >
      <ItemActions item={notification}>
        <ActionButton
          backgroundColor={
            notification.status === 'pending' ? 'orange' : 'gray.100'
          }
          label="Adicionar pendencia"
          icon={<AiOutlineClockCircle size={22} />}
          onClick={() => onEdit(notification, 'pending')}
          color={notification.status === 'pending' ? 'white' : 'gray.700'}
        />

        <ActionButton
          label="Marcar como resolvido"
          icon={<AiFillCheckCircle size={22} />}
          color="gray.700"
          onClick={() => onEdit(notification, 'solved')}
        />
      </ItemActions>
    </Item>
  );
}
