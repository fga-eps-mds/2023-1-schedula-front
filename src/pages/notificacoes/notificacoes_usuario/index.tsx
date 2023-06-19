import { FaSearch } from 'react-icons/fa';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Notification } from '@/features/notifications/api/types';
import { NotificationItem } from '@/features/notifications/components/notification-item';
import { useGetAllNotification } from '@/features/notifications/api/get-all-notifications';
import { ListView } from '@/components/list';
import { NotificationPendencyModal } from '@/features/notifications/components/notification-pendency-modal';

export function NotificacaoUsuario() {
  const { data: notifications, isLoading } = useGetAllNotification();

  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >(notifications || []);

  const [notificationToEdit, setNotificationToEdit] = useState<Notification>();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const onEdit = useCallback(
    (notification: Notification) => {
      setNotificationToEdit(notification);
      onOpen();
      console.log(notification);
    },
    [onOpen]
  );
  const handleClose = useCallback(() => {
    setNotificationToEdit(undefined);
    onClose();
  }, [onClose]);

  const user = JSON.parse(localStorage.getItem('@schedula:user') || '[]');

  const {
    onOpen: onOpenView,
    isOpen: isOpenView,
    onClose: onCloseView,
  } = useDisclosure();
  const onView = useCallback(
    (notification: Notification) => {
      setNotificationToEdit(notification);
      onOpenView();
    },
    [onOpenView]
  );

  const renderNotificationItem = useCallback(
    (notification: Notification) => (
      <NotificationItem
        notification={notification}
        isviewing={false}
        onEdit={onEdit} /* onView={"string"} */
      />
    ),
    [onEdit]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.toLowerCase();
      const filteredNotifications = notifications?.filter((notification) =>
        notification.message.toLowerCase().includes(searchText)
      );
      setFilteredNotifications(filteredNotifications || []);
    },
    [notifications]
  );

  useEffect(() => {
    const updatedNotifications = notifications || [];
    setFilteredNotifications(updatedNotifications);
  }, [notifications]);

  return (
    <>
      <PageHeader title="Notificações" />

      <div>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} boxSize={4} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Pesquisar notificações"
            _placeholder={{ color: 'gray.400' }}
            onChange={handleSearch}
            style={{ marginBottom: '10px' }}
          />
        </InputGroup>
      </div>

      <NotificationPendencyModal
        isOpen={isOpen}
        onClose={handleClose}
        notification={notificationToEdit}
        onClear={function (): void {
          throw new Error('Function not implemented.');
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.');
        }}
      />

      <ListView<Notification>
        items={filteredNotifications.filter((notification) => {
          return notification.targetEmail === user.email;
        })}
        render={renderNotificationItem}
        isLoading={isLoading}
      />
    </>
  );
}
