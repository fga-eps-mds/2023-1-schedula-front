import { useCallback, useState, useEffect } from 'react';
import { Button, useDisclosure, HStack, Spinner } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { PageHeader } from '@/components/page-header';
import { useGetallAlerts } from '@/features/alerts/api/get-all-alerts';
import { useDeleteAlert } from '@/features/alerts/api/delete-alerts';
import { ListView } from '@/components/list';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { AlertItemManager } from '@/features/alerts/components/alert-item-manager';
import { Alert } from '@/features/alerts/api/types';
import { ALERTA_STATUS } from '@/constants/alertas';
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';
import { Permission } from '@/components/permission';
import { AlertModal } from '@/features/alerts/components/alert-modal';

export function NotificacaoAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: alerts, isLoading, refetch } = useGetallAlerts();

  const { mutate: deleteAlert, isLoading: isRemovingAlert } = useDeleteAlert();

  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(alerts || []);
  const [selectedAlert, setSelectedAlert] = useState<string>('');

  const onDelete = useCallback(
    (alertId: string) => {
      deleteAlert({ alertId });
      // setModalClosed((prevModalClosed) => !prevModalClosed);
    },
    [deleteAlert]
  );

  const renderAlertItemManager = useCallback(
    (alert: Alert) => (
      <AlertItemManager
        alert={alert}
        isDeleting={isRemovingAlert}
        onDelete={() => {
          onDelete(alert.id);
        }}
      />
    ),
    [isRemovingAlert, onDelete]
  );

  const options: Array<{ label: string; value: string }> = Object.entries(
    ALERTA_STATUS
  ).map((status) => ({
    label: status[1],
    value: status[0],
  }));

  const handleSubmitAlert = () => {
    refetch();
  };

  const handleChangeFilter = (option: any) => {
    setSelectedAlert(option?.value || '');
  };

  useEffect(() => {
    if (alerts) {
      if (selectedAlert) {
        setFilteredAlerts(
          alerts.filter((alert) => alert.status === selectedAlert)
        );
        // Sort by createdAt
        setFilteredAlerts((prevAlerts) =>
          prevAlerts.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
          })
        );
      } else {
        setFilteredAlerts(alerts);

        // Sort by createdAt
        setFilteredAlerts((prevAlerts) =>
          prevAlerts.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
          })
        );
      }
    }
  }, [alerts, selectedAlert]);

  return (
    <>
      <PageHeader title="Notificações">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN']}>
            <Button variant="primary" onClick={onOpen}>
              Notificar
            </Button>
          </Permission>
        </HStack>
      </PageHeader>

      <HStack spacing={2} marginBottom={4}>
        <div style={{ width: '18vw' }}>
          <Select
            aria-label="Filtrar por status"
            placeholder="Status"
            options={options}
            onChange={handleChangeFilter}
            isClearable
            isSearchable={false}
            chakraStyles={chakraStyles}
            components={customComponents}
          />
        </div>
      </HStack>

      {isLoading ? (
        <Spinner thickness="4px" speed="0.35s" color="orange.500" size="xl" />
      ) : (
        <ListView<Alert>
          items={filteredAlerts}
          render={renderAlertItemManager}
          isLoading={isLoading}
        />
      )}

      <AlertModal
        isOpen={isOpen}
        onClose={onClose}
        handleSubmitAlert={handleSubmitAlert}
      />
    </>
  );
}
