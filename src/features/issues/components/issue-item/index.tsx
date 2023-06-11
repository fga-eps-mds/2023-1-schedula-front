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
import { Issue } from '@/features/issues/types';
import { Item } from '@/components/list-item';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { Permission } from '@/components/permission';

interface IssueItemProps {
  issue: Issue;
  onEdit: (issue: Issue) => void;
}

export function IssueItem({ issue, onEdit }: IssueItemProps) {
  const { data: cities } = useGetAllCities(0);
  const city = cities?.find((city) => {
    return city?.id === issue?.city_id;
  });

  return (
    <Box>
      <HStack spacing={2}>
        <Badge colorScheme="blue" variant="outline">
          {issue?.problem_category?.name}
        </Badge>
        <Spacer />
      </HStack>
      <Item
        title={
          <HStack spacing={6}>
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
              <Text noOfLines={1}>{issue?.requester}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Telefone
              </Text>
              <Text noOfLines={1}>{issue?.phone}</Text>
            </Box>
          </HStack>
        }
        description={
          <VStack align="stretch" spacing={2}>
            <HStack gap={4} mt={2} flexWrap="wrap">
              {issue?.problem_types?.map((problem) => (
                <HStack align="start" spacing={1} key={problem?.id}>
                  <Tag variant="subtle" colorScheme="gray">
                    {problem?.name}
                  </Tag>
                </HStack>
              ))}
              <Box display="flex" gap={2}>
                <Box textAlign="center" fontWeight="medium">
                  <Text fontSize="sm" fontWeight="light" color="GrayText">
                    Data
                  </Text>
                  <Text>{formatDate(issue?.date, 'date')} </Text>
                </Box>
                <Box textAlign="center" fontWeight="medium">
                  <Text fontSize="sm" fontWeight="light" color="GrayText">
                    Hora
                  </Text>
                  <Text>{formatDate(issue?.date, 'time')}</Text>
                </Box>
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
          >
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Atendente
              </Text>
              <Text noOfLines={1}>{issue?.email}</Text>
              <Permission allowedRoles={['ADMIN']}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    textAlign: 'left',
                  }}
                >
                  <ItemActions item={city}>
                    <EditButton onClick={onEdit} label="atendimento" />

                    <DeleteButton
                      label="atendimento"
                      onClick={function click(): void | Promise<void> {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  </ItemActions>
                </div>
              </Permission>
            </Box>
          </HStack>
        </VStack>
      </Item>
    </Box>
  );
}
