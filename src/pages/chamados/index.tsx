import {
  Button,
  HStack,
  Box,
  Input,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { TiFilter } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllIssues } from '@/features/issues/api/get-all-issues';
import { Issue } from '@/features/issues/types';
import { Permission } from '@/components/permission';
import { ListView } from '@/components/list';
import { IssueItem } from '@/features/issues/components/issue-item';
import { useDeleteIssue } from '@/features/issues/api/delete-issue';

export function sortIssues(issues: Issue[] | undefined): Issue[] {
  if (!issues) {
    return [];
  }

  return issues.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });
}

export function Chamados() {
  const {
    data: issues,
    isLoading: isLoadingIssues,
    refetch,
  } = useGetAllIssues();

  const { mutate: deleteIssue, isLoading: isRemovingIssue } = useDeleteIssue();

  const onDelete = useCallback(
    (issueId: string) => {
      deleteIssue({ issueId });
    },
    [deleteIssue]
  );

  const renderIssueItem = useCallback(
    (issue: Issue) => (
      <IssueItem
        issue={issue}
        onDelete={onDelete}
        isDeleting={isRemovingIssue}
      />
    ),
    [onDelete, isRemovingIssue]
  );

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleStartDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(event.target.value);
    },
    []
  );

  const handleEndDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndDate(event.target.value);
    },
    []
  );

  const applyFilter = useCallback(() => {
    setIsFiltering(true);
  }, []);

  const clearFilter = useCallback(() => {
    setIsFiltering(false);
    setStartDate(null);
    setEndDate(null);
  }, []);

  let filteredIssues = issues;

  if (isFiltering) {
    filteredIssues = filteredIssues?.filter((issue) => {
      const issueDate = new Date(issue.date).toISOString().split('T')[0];
      return (
        (!startDate || issueDate >= startDate) &&
        (!endDate || issueDate <= endDate)
      );
    });
  }

  filteredIssues = sortIssues(filteredIssues);

  return (
    <>
      <PageHeader title="Atendimentos">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN', 'BASIC']}>
            <Link to="/chamados/registrar">
              <Button variant="primary">Novo Atendimento</Button>
            </Link>
          </Permission>
        </HStack>
      </PageHeader>

      <Flex direction={['column', 'row']} align="center">
        <Text color="gray.500" mr={2}>
          <b>Data inicial</b>
        </Text>
        <Box mb={[4, 0]} mr={4}>
          <Input
            type="date"
            onChange={handleStartDateChange}
            value={startDate || ''}
            placeholder="Data inicial"
          />
        </Box>
        <Text color="gray.500" mr={2}>
          <b>Data final</b>
        </Text>
        <Box mb={[4, 0]} mr={4}>
          <Input
            type="date"
            onChange={handleEndDateChange}
            value={endDate || ''}
            placeholder="Data final"
          />
        </Box>
        <Button leftIcon={<TiFilter />} onClick={applyFilter} mr={2}>
          Aplicar Filtro
        </Button>
        {isFiltering && (
          <Button
            leftIcon={<IoClose />}
            onClick={clearFilter}
            variant="outline"
            color="primary"
          >
            Limpar Filtro
          </Button>
        )}
      </Flex>

      <Divider my={5} />

      <ListView<Issue>
        items={filteredIssues}
        render={renderIssueItem}
        isLoading={isLoadingIssues}
      />
    </>
  );
}
