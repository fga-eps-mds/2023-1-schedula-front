import { Badge, HStack, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { Item } from '@/components/list-item';
import { Alert } from '../../type';
import { ALERTA_STATUS } from '@/constants/alertas';

interface AlertItemManagerProps {
  alert: Alert;
  onDelete: (alertId: string) => void;
  isDeleting: boolean;
}

export function AlertItemManager({
  alert,
  onDelete,
  isDeleting,
}: AlertItemManagerProps) {
  const alertReadIcon = (read: boolean) => {
    if (read) {
      return <CheckCircleIcon color="orange.500" />;
    }
    return <CheckCircleIcon color="gray.300" />;
  };

  const alertStatusBadge = (status: string) => {
    if (status === 'solved') {
      return (
        <Badge variant="outline" colorScheme="green">
          {ALERTA_STATUS[status]}
        </Badge>
      );
    }
    if (status === 'pending') {
      return (
        <Badge variant="outline" colorScheme="yellow">
          {ALERTA_STATUS[status]}
        </Badge>
      );
    }
    if (status === 'unsolved') {
      return (
        <Badge variant="outline" colorScheme="red">
          {ALERTA_STATUS[status]}
        </Badge>
      );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Item
        title={`${alert?.targetName}`}
        description={
          <VStack spacing={2} align="flex-start">
            <HStack spacing={2} mt={2.5}>
              <p style={{ fontSize: '1.1em' }}>{alert?.message}</p>
            </HStack>
            <HStack spacing={2} mt={2.5}>
              <p>{alert?.pendency}</p>
            </HStack>
          </VStack>
        }
      >
        <HStack spacing={5} align="center" justifyItems="center">
          {alertStatusBadge(alert.status)}
          {alertReadIcon(alert.read)}
          <DeleteButton
            onClick={() => {
              if (alert.id) {
                onDelete(alert.id);
              }
            }}
            label="Alerta"
            isLoading={isDeleting}
          />
        </HStack>
      </Item>
    </div>
  );
}
