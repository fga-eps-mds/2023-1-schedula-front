import {
  Badge,
  Box,
  Button,
  HStack,
  Spacer,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { formatDate } from '@/utils/format-date';
import { Item } from '@/components/list-item';
import { Schedule } from '@/features/schedules/types';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { EditButton } from '@/components/action-buttons/edit-button';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { Permission } from '@/components/permission';

interface ScheduleItemProps {
  schedule: Schedule;
  onEdit: (schedule: Schedule) => void;
  onDelete: (scheduleId: string) => void;
  isDeleting: boolean;
}

export function ScheduleItem({
  schedule,
  onEdit,
  onDelete,
  isDeleting,
}: ScheduleItemProps) {
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

  const [isExpanded, setIsExpanded] = useState(false);

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
              {isExpanded ? (
                <Box maxWidth="110ch">
                  <Text noOfLines={undefined}>{schedule.description}</Text>
                </Box>
              ) : (
                <Text noOfLines={1}>
                  {schedule.description.length > 110
                    ? `${schedule.description.substring(0, 110)}...`
                    : schedule.description}
                </Text>
              )}
              {schedule.description.length > 110 && (
                <Button
                  size="xs"
                  variant="link"
                  colorScheme="blue"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
                </Button>
              )}
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
