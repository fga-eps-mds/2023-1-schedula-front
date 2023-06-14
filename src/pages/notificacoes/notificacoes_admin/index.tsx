import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { Button, Icon, Flex, useDisclosure } from '@chakra-ui/react';
import { Props, Select } from 'chakra-react-select';
import { FaTags } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import { PageHeader } from '@/components/page-header';
import { useGetallAlerts } from '@/features/alerts/api/get-all-alerts';
import { useDeleteAlert } from '@/features/alerts/api/delete-alerts';
import { ListView } from '@/components/list';
import { AlertItemManager } from '@/features/alerts/components/alert-item-manager';
import { Alert } from '@/features/alerts/api/types';
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';
import { Permission } from '@/components/permission';
import { AlertModal } from '@/features/alerts/components/alert-modal';

export function NotificacaoAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: alerts, isLoading } = useGetallAlerts();

  const { mutate: deleteAlert, isLoading: isRemovingAlert } =
    useDeleteAlert();
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(alerts || []);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const onDelete = useCallback(
    (alertId: string) => {
      deleteAlert({ alertId });
      // setModalClosed((prevModalClosed) => !prevModalClosed);
    },
    [deleteAlert]
  );

  const renderAlertItemManager = useCallback(
    (alert: Alert) => <AlertItemManager alert={alert} isDeleting={isRemovingAlert} onDelete={() => {onDelete(alert.id)}} />,
    []
  );

  const handleResetFilters = useCallback(() => {
    setFilteredAlerts(alerts || []);
    setSelectedCategory('');
  }, [alerts]);

  const handleCategoryChange = useCallback(
    (selectedOption: Props<any>['value']) => {
      if (selectedOption?.value === '') {
        handleResetFilters();
      } else {
        setSelectedCategory(selectedOption?.value || '');
      }
    },
    [handleResetFilters]
  );

  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Notificações">
        <Permission allowedRoles={['ADMIN']}>
          <Button
            variant="primary"
            onClick={onOpen}>
              Notificar
          </Button>
        </Permission>
      </PageHeader>

      <div style={{ width: '15vw' , marginBottom:  '2%'}}>
        <Select
          aria-label="Filtrar por categoria"
          placeholder={
            <Flex alignItems="center">
              <Icon as={FaTags} boxSize={4} mr={2} />
              Status
            </Flex>
          }
          onChange={handleCategoryChange}
          value={selectedCategory}
          chakraStyles={chakraStyles}
          components={customComponents}
        />
      </div>

      <ListView<Alert>
        items={filteredAlerts}
        render={renderAlertItemManager}
        isLoading={isLoading}
      />
      <AlertModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}