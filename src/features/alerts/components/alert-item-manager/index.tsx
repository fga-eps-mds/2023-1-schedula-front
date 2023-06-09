import { Checkbox, HStack } from '@chakra-ui/react';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';
import { Alert } from '../../type';

interface AlertItemManagerProps {
  alert: Alert;
  onDelete: (alertId: string) => void;
  isDeleting: boolean;
  isSelected: boolean;
  onChecked: (value: string, checked: boolean) => void;
}

export function AlertItemManager({
  alert,
  onDelete,
  isDeleting,
  isSelected,
  onChecked,
}: AlertItemManagerProps) {
  const handleCheckbox = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;
    onChecked(value, checked);
  };

  return (
    <div style={{ display: 'flex' }}>
      {isSelected && (
        <Checkbox
          style={{ marginRight: '10px' }}
          onChange={(event) => {
            handleCheckbox(event);
          }}
          value={alert?.id}
        />
      )}
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
