import { HStack } from '@chakra-ui/react';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';
import { Alert } from '../../type';

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

  return (
    <div style={{ display: 'flex' }}>
      <Item
        title={`${alert?.targetName}`}
        description={
          <HStack spacing={2} mt={2.5}>
            <p>{alert?.message}</p>
          </HStack>
        }
      >
        <Permission allowedRoles={['ADMIN']}>
          <ItemActions item={alert}>
            <DeleteButton
              onClick={() => {
                if (alert.id) {
                  onDelete(alert.id);
                }
              }}
              label={alert.targetName}
              isLoading={isDeleting}
            />
          </ItemActions>
        </Permission>
      </Item>
    </div>
  );
}
