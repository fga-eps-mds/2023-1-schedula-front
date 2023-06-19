import { MdLibraryAdd } from 'react-icons/md';
import { AiFillCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { Box, Text } from '@chakra-ui/react';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { ActionButton } from '@/components/action-buttons';
import { Notification } from '../../types';
import { formatDate } from '@/utils/format-date';

interface NotificationItemProps {
  notification: Notification;
  onEdit: (notification: Notification) => void;
  /* onView: (notificationId: string) => void; */
  isviewing: boolean;
}

export function NotificationItem({
  notification,
  onEdit,
  isviewing,
}: NotificationItemProps) {
  return (
    <Item
      title={notification.message}
      description={
        <Box display="flex" gap={2}>
          <Box textAlign="center" fontWeight="medium">
            <Text fontSize="sm" fontWeight="light" color="GrayText">
              Usuário
            </Text>
            <Text>{notification.sourceName} </Text>
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
          label="Adicionar pendencia"
          icon={<AiOutlineClockCircle size={22} />}
          onClick={() => onEdit(notification)}
          color="gray.700"
        />

        <ActionButton
          label="Marcar como resolvido"
          icon={<AiFillCheckCircle size={22} />}
          color="gray.700"
          onClick={function (item: unknown): void | Promise<void> {
            throw new Error('Function not implemented.');
          }}
        />
      </ItemActions>
    </Item>
  );
}
