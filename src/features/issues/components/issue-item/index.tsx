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
import {
  useGetAllCities,
  useGetCity,
} from '@/features/cities/api/get-all-cities';
import { ItemActions } from '@/components/list-item/list-item-actions';
import { EditButton } from '@/components/action-buttons/edit-button';
import { DeleteButton } from '@/components/action-buttons/delete-button';

interface IssueItemProps {
  issue: Issue;
  onEdit: (issue: Issue) => void;
  onDelete: (issueId: string) => void;
  isDeleting: boolean;
}

export function IssueItem({
  issue,
  onEdit,
  onDelete,
  isDeleting,
}: IssueItemProps) {
  const { data: cities, isLoading: isLoadingCities } = useGetAllCities();
  const city = cities?.find((city) => {
    return city?.id === issue?.city_id;
  });

  return (
    <Box>
      <HStack spacing={2}>
        <Badge colorScheme="blue" variant="outline">
          {issue.problem_category.name}
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
              <Text noOfLines={1}>{issue.requester}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Telefone
              </Text>
              <Text noOfLines={1}>{issue.phone}</Text>
            </Box>
          </HStack>
        }
        description={
          <VStack align="stretch" spacing={2}>
            <HStack gap={4} mt={2} flexWrap="wrap">
              <Tag variant="subtle" colorScheme="purple">
                {issue?.problem_category?.name}
              </Tag>
              {issue?.problem_types?.map((problem) => (
                <HStack align="start" spacing={1} key={problem?.id}>
                  <Tag variant="subtle" colorScheme="gray">
                    {problem?.name}
                  </Tag>
                </HStack>
              ))}
              <Box>
                <Text fontSize="sm" fontWeight="light" color="GrayText">
                  Data / Hora
                </Text>
                <Box textAlign="center" fontWeight="medium">
                  <Text>
                    {formatDate(issue?.date, 'date')}{' '}
                    {formatDate(issue?.date, 'time')}
                  </Text>
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
            </Box>
          </HStack>

          <ItemActions item={issue}>
            <EditButton
              onClick={onEdit}
              label="Editar Chamado"
              disabled={isDeleting}
            />

            <DeleteButton
              onClick={() => onDelete(issue?.id)}
              label="Deletar Chamado"
              isLoading={isDeleting}
            />
          </ItemActions>
        </VStack>
      </Item>
    </Box>
  );
}
