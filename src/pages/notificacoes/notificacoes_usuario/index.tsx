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
import { usePutUpdateNotifications } from '@/features/notifications/api/put-update-notifications';

export function NotificacaoUsuario() {
  const { data: notifications, isLoading } = useGetAllNotification();

  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >(notifications || []);

  const [notificationToEdit, setNotificationToEdit] = useState<Notification>();
  const [notificationStatus, setNotificationStatus] = useState<
    'pending' | 'solved'
  >('pending');
  const { onOpen, isOpen, onClose } = useDisclosure();
  const onEdit = useCallback(
    (notification: Notification, notificationStatus: 'pending' | 'solved') => {
      setNotificationToEdit(notification);
      setNotificationStatus(notificationStatus);
      onOpen();
    },
    [onOpen]
  );
  const handleClose = useCallback(() => {
    setNotificationToEdit(undefined);
    onClose();
  }, [onClose]);

  const user = JSON.parse(localStorage.getItem('@schedula:user') || '[]');

  const notificationRead = notifications?.filter(
    (notification) =>
      notification.targetEmail === user.email && !notification.read
  );

  const renderNotificationItem = useCallback(
    (notification: Notification) => (
      <NotificationItem
        notification={notification}
        onEdit={(notification, notificationStatus) =>
          onEdit(notification, notificationStatus)
        }
      />
    ),
    [onEdit]
  );

  const { mutate: updateNotification } = usePutUpdateNotifications({
    onSuccessCallBack: () => {},
    showToast: false,
  });

  const [isNotificationRead, setIsNotificationRead] = useState(false);

  useEffect(() => {
    if (
      !isNotificationRead &&
      notificationRead &&
      notificationRead.length > 0
    ) {
      notificationRead.forEach((notification) => {
        updateNotification({
          notificationId: notification.id,
          data: {
            read: true,
            status: notification.status,
            pendency: notification.pendency,
          },
        });
      });
      setIsNotificationRead(true);
    }
  }, [notificationRead, isNotificationRead, updateNotification]);

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
        notificationStatus={notificationStatus}
      />

      <ListView<Notification>
        items={filteredNotifications
          .filter((notification) => {
            return notification.targetEmail === user.email;
          })
          .sort((a, b) => {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          })}
        render={renderNotificationItem}
        isLoading={isLoading}
      />
    </>
  );
}
