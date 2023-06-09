import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { Button, Icon, Flex } from '@chakra-ui/react';
import { Props, Select } from 'chakra-react-select';
import { FaTags } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import { PageHeader } from '@/components/page-header';
import { useGetallAlerts } from '@/features/alerts/api/get-all-alerts';
import { ListView } from '@/components/list';
import { AlertItemManager } from '@/features/alerts/components/alert-item-manager';
import { Alert } from '@/features/alerts/api/types';
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';
import { Permission } from '@/components/permission';

export function Notificacoes() {
  const { data: alerts, isLoading } = useGetallAlerts();

  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(alerts || []);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const renderAlertItemManager = useCallback(
    (alert: Alert) => <AlertItemManager alert={alert} />,
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

  /* useEffect(() => {
    let updatedAlerts = alerts || [];
    if (selectedCategory) {
      updatedAlerts = updatedAlerts.filter(
        (alert) => alert.message.tarame === selectedCategory
      );
    }
    updatedAlerts.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredAlerts(updatedAlerts);
  }, [alerts, selectedCategory, handleResetFilters]);

  const resetButton = selectedCategory ? (
      <Button
            variant="link"
            colorScheme="gray"
            size="xs"
            onClick={handleResetFilters}
            marginLeft={2}
      >
        <CloseIcon boxSize={3} />
      </Button>
  ) : null;

  const options = useMemo(() => {
    const uniqueCategories = new Set(
      alerts?.map((alert) => alert.category.name)
    );

    const allCategoriesOption = { label: 'Todas as categorias', value: '' };
    const categoryOptions = [...uniqueCategories].map((category) => ({
      label: category,
      value: category,
    }));

    return selectedCategory
      ? [allCategoriesOption, ...categoryOptions]
      : categoryOptions;
  }, [alerts, selectedCategory]); */

  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Notificações">
        <Permission allowedRoles={['ADMIN']}>
          <Button
            variant="primary"
            onClick={() => navigate('gerenciar-alert')}
            style={{ marginLeft: 30 }}
          >
            Notificar
          </Button>
        </Permission>
      </PageHeader>

      <div style={{ width: '290px' }}>
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
    </>
  );
}
