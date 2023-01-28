import { Badge, Flex, HStack, Text, Tooltip } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { Item } from '@/components/list-item';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { EditButton } from '@/components/action-buttons/edit-button';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { ActionButton } from '@/components/action-buttons';
import { useDeleteWorkstation } from '@/features/workstations/api/delete-workstation';

interface WorkstationItemProps {
  workstation: Workstation;
  onEdit: (workstation: Workstation) => void;
  onDelete: (workstation: Workstation) => void;
  isDeletingRegionalWorkstation: boolean;
}
export function WorkstationItem({
  workstation,
  onEdit,
  onDelete,
  isDeletingRegionalWorkstation,
}: WorkstationItemProps) {
  const isRegionalWithChildren =
    workstation.is_regional &&
    workstation.child_workstations &&
    workstation.child_workstations.length > 0;

  const { mutate: deleteWorkstation, isLoading: isDeletingWorkstation } =
    useDeleteWorkstation({});

  return (
    <Item<Workstation>
      title={
        <Flex>
          {workstation?.name}
          <HStack spacing={2} ml={4}>
            {workstation?.is_regional && (
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
                  IP: {workstation?.ip}
                </Badge>
              </Tooltip>
              <Badge colorScheme="orange" variant="solid">
                Gateway: {workstation?.gateway}
              </Badge>
              <Badge colorScheme="orange" variant="subtle">
                {workstation?.phone}
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
          disabled={isDeletingWorkstation}
        />

        {isRegionalWithChildren ? (
          <ActionButton
            label={`Excluir ${workstation.name}`}
            icon={<FaTrash />}
            onClick={() => onDelete(workstation)}
            color="red.500"
            tabIndex={0}
          />
        ) : (
          <DeleteButton
            onClick={() =>
              deleteWorkstation({ workstationId: workstation.id, data: [] })
            }
            label={workstation.name}
            isLoading={isDeletingWorkstation || isDeletingRegionalWorkstation}
          />
        )}
      </ItemActions>
    </Item>
  );
}
