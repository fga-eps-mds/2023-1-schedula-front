import { HStack } from '@chakra-ui/react';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';

interface CityItemProps {
  city: City;
  onEdit: (city: City) => void;
  onDelete: (cityId: string) => void;
  isDeleting: boolean;
}

export function CityItem({
  city,
  onEdit,
  onDelete,
  isDeleting,
}: CityItemProps) {
  return (
    <Item
      title={`${city?.name}`}
      description={
        <HStack spacing={2} mt={2.5}>
          <p>{city?.state}</p>
        </HStack>
      }
    >
      <Permission allowedRoles={['ADMIN']}>
        <ItemActions item={city}>
          <EditButton
            onClick={onEdit}
            label={city.name}
            disabled={isDeleting}
          />

          <DeleteButton
            onClick={() => onDelete(city.id)}
            label={city.name}
            isLoading={isDeleting}
          />
        </ItemActions>
      </Permission>
    </Item>
  );
}
