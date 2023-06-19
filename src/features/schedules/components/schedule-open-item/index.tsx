import {
  Badge,
  Box,
  HStack,
  Spacer,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { formatDate } from '@/utils/format-date';
import { Item } from '@/components/list-item';
import { ScheduleOpen } from '@/features/schedules/types';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { EditButton } from '@/components/action-buttons/edit-button';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { Permission } from '@/components/permission';

interface ScheduleOpenItemProps {
  schedule: ScheduleOpen;
  onEdit: (schedule: ScheduleOpen) => void;
  onDelete: (scheduleId: string) => void;
  isDeleting: boolean;
}

export function ScheduleOpenItem({
  schedule,
  onEdit,
  onDelete,
  isDeleting,
}: ScheduleOpenItemProps) {
  const scheduleDate = schedule?.dateTime
    ? new Date(schedule.dateTime)
    : new Date();

  function getBadgeColor() {
    switch (schedule.status.toLowerCase()) {
      case 'não resolvido':
        return 'gray';
      case 'em andamento':
        return 'blue';
      case 'pendente':
        return 'yellow';
      case 'urgente':
        return 'red';
      default:
        return 'green';
    }
  }

  return (
    <Box>
      <HStack spacing={2}>
        <Badge colorScheme={getBadgeColor()} variant="outline">
          {schedule.status}
        </Badge>
        <Spacer />
      </HStack>

      <Item
        title={
          <HStack spacing={6}>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Agendado para:
              </Text>
              <Text noOfLines={1}>{formatDate(scheduleDate)}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Solicitante:
              </Text>
              <Text noOfLines={1}>{schedule.issue.requester}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Telefone:
              </Text>
              <Text noOfLines={1}>{schedule.issue.phone}</Text>
            </Box>
          </HStack>
        }
        description={
          <VStack align="stretch" spacing={2}>
            <HStack gap={4} mt={2} flexWrap="wrap">
              {schedule?.alerts?.map((alert) => (
                <HStack align="start" spacing={1} key={alert.id}>
                  <Tag variant="subtle" colorScheme="gray">
                    Alerta: {formatDate(alert.date)}
                  </Tag>
                </HStack>
              ))}
            </HStack>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Descrição:
              </Text>
              <Text noOfLines={1}>{schedule.description}</Text>
            </Box>
          </VStack>
        }
      >
        <VStack>
          <ItemActions item={schedule}>
            <Permission
              allowedRoles={['ADMIN', 'BASIC']}
              allowCreatedByUserEmail={schedule.issue.email}
            >
              <EditButton
                onClick={onEdit}
                label="Agendamento"
                disabled={isDeleting}
              />
            </Permission>

            <Permission allowedRoles={['ADMIN']}>
              <DeleteButton
                onClick={() => onDelete(schedule?.id)}
                label="Agendamento"
                isLoading={isDeleting}
              />
            </Permission>
          </ItemActions>
          <HStack
            alignItems="start"
            spacing={6}
            height="100%"
            textAlign="right"
          >
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Atendente
              </Text>
              <Text noOfLines={1}>{schedule.issue.email}</Text>
            </Box>
          </HStack>
        </VStack>
      </Item>
    </Box>
  );
}
