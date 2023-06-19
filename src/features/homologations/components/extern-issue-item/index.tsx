import {
  Badge,
  Box,
  HStack,
  Spacer,
  Tag,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { RiEdit2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { formatDate } from '@/utils/format-date';
import { ExternIssue } from '@/features/issues/types';
import { Item } from '@/components/list-item';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';
import { ActionButton } from '@/components/action-buttons';
import { DeleteButton } from '@/components/action-buttons/delete-button-homologation';
import { ApproveButton } from '@/components/action-buttons/approve-button-homologation';
import { usePostCreateScheduleOpen } from '@/features/homologations/api/post-create-schedule-open';

interface ExternIssueItemProps {
  externIssue: ExternIssue;
  onDelete: (externIssueId: string) => void;
  isDeleting: boolean;
}

export function ExternIssueItem({
  externIssue,
  onDelete,
  isDeleting,
}: ExternIssueItemProps) {
  const history = useNavigate();
  const navigate = useNavigate();
  const handleOnClick = (externIssue: ExternIssue) => {
    history('/homologacao/editar', { state: { externIssue } });
  };
  const { data: cities } = useGetAllCities(0);
  const city = cities?.find((city) => {
    return city?.id === externIssue?.city_id;
  });

  const { data: workstations } = useGetAllWorkstations();
  const workstation = workstations?.find((workstation) => {
    return workstation?.id === externIssue?.workstation_id;
  });

  const { mutate: createSchedule, isLoading: isCreatingSchedule } =
    usePostCreateScheduleOpen({
      onSuccessCallBack: () => navigate('/agendamentos'),
    });

  const handleSubmitOpen = useCallback(
    ({ alert_dates, description, event_date }: ChamadoExternoEvent) => {
      const alerts = alert_dates?.map((alert) => alert.date) || [];

      createSchedule({
        alerts: alerts ?? [],
        dateTime: event_date ?? new Date(),
        description: description ?? '',
        issue_id: externIssue?.id ?? '',
        status_e: 'NOT_RESOLVED',
      });
    },
    [createSchedule, externIssue?.id]
  );

  return (
    <Box>
      <HStack spacing={2}>
        <Badge colorScheme="blue" variant="outline">
          {externIssue?.problem_category?.name}
        </Badge>
        <Spacer />
      </HStack>
      <Item
        title={
          <HStack spacing={6}>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Posto de Trabalho
              </Text>
              <Text noOfLines={1}>{workstation?.name}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Local
              </Text>
              <Text noOfLines={1}>{city?.name}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Solicitante
              </Text>
              <Text noOfLines={1}>{externIssue?.requester}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Telefone
              </Text>
              <Text noOfLines={1}>{externIssue?.phone}</Text>
            </Box>
            <Box textAlign="center" fontWeight="medium">
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Data
              </Text>
              <Text>{formatDate(externIssue?.date, 'date')} </Text>
            </Box>
            <Box textAlign="center" fontWeight="medium">
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Hora
              </Text>
              <Text>{formatDate(externIssue?.date, 'time')}</Text>
            </Box>
            <HStack gap={4} mt={2} flexWrap="wrap">
              {externIssue?.problem_types?.map((problem) => (
                <HStack align="start" spacing={1} key={problem?.id}>
                  <Tag variant="subtle" colorScheme="gray">
                    {problem?.name}
                  </Tag>
                </HStack>
              ))}
            </HStack>
          </HStack>
        }
        description={
          <VStack align="stretch" spacing={2}>
            <HStack gap={4} mt={2} flexWrap="wrap">
              <Box textAlign="center" fontWeight="medium">
                <Text fontSize="sm" fontWeight="light" color="GrayText">
                  Descrição
                </Text>
                <Text noOfLines={1}>{externIssue?.description}</Text>
              </Box>
            </HStack>
          </VStack>
        }
      >
        <VStack>
          <HStack
            alignItems="start"
            spacing={6}
            height="100%"
            textAlign="right"
          />
          <HStack alignItems="start" spacing={4} height="75%" textAlign="right">
            <ApproveButton
              label="Aprovar Homologação"
              icon={<AiFillCheckCircle size={23} />}
              onClick={() => handleSubmitOpen(externIssue)}
              color="green.500"
              tabIndex={0}
            />
            <ActionButton
              label="Editar Homologação"
              icon={<RiEdit2Fill size={23} />}
              onClick={() => handleOnClick(externIssue)}
              color="yellow.500"
              tabIndex={0}
            />

            <DeleteButton
              label="Homologação"
              icon={<AiFillCloseCircle size={21} />}
              onClick={() => onDelete(externIssue?.id)}
              color="red.500"
              tabIndex={0}
            />
          </HStack>
        </VStack>
      </Item>
    </Box>
  );
}
