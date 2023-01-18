import { Badge, Flex, HStack, Text, Tooltip } from '@chakra-ui/react';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { EditButton } from '@/components/action-buttons/edit-button';
import { DeleteButton } from '@/components/action-buttons/delete-button';

interface WorkstationItemProps {
  workstation: Workstation;
  onEdit: (workstation: Workstation) => void;
  onDelete: (workstationId: string) => void;
  isDeleting: boolean;
}
export function WorkstationItem({
  workstation,
  onEdit,
  onDelete,
  isDeleting,
}: WorkstationItemProps) {
  // const { data: city, isLoading: isLoadingCity } = useRequest<City>(
  //   workstation ? getCityById(workstation?.city_id) : null,
  //   {
  //     revalidateIfStale: false,
  //   }
  // );

  // const handleDelete = useCallback(
  //   async ({ id }: Workstation) => {
  //     const response = await request<null>(deleteWorkstation(id));

  //     onDelete?.(response, workstation);
  //   },
  //   [workstation, onDelete]
  // );

  return (
    <Item<Workstation>
      title={
        <Flex>
          {workstation?.name}
          <HStack spacing={2} ml={4}>
            {(workstation.child_workstations?.length ?? 0) > 0 && (
              <Badge colorScheme="purple" variant="solid">
                Regional
              </Badge>
            )}
            <>
              <Tooltip
                colorScheme="blackAlpha"
                label="IP"
                placement="top"
                openDelay={350}
              >
                <Badge colorScheme="orange" variant="outline">
                  {workstation?.ip}
                </Badge>
              </Tooltip>
              <Badge colorScheme="orange" variant="subtle">
                {workstation?.gateway}
              </Badge>
            </>
          </HStack>
        </Flex>
      }
      description={<Text>{workstation?.city.name}</Text>}
    >
      <ItemActions item={workstation}>
        <EditButton
          onClick={onEdit}
          label={workstation.name}
          disabled={isDeleting}
        />

        <DeleteButton
          onClick={() => onDelete(workstation.id)}
          label={workstation.name}
          isLoading={isDeleting}
        />
      </ItemActions>
    </Item>
  );
}
