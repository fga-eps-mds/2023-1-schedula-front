import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllIssues } from '@/features/issues/api/get-all-issues';
import { Issue } from '@/features/issues/types';
import { Permission } from '@/components/permission';
import { ListView } from '@/components/list';
import { IssueItem } from '@/features/issues/components/issue-item';
import { useDeleteIssue } from '@/features/issues/api/delete-issue';
import { ScheduleModal } from '@/features/schedules/components/schedule-modal';

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
  const sortedIssues = sortIssues(issues);

  const { mutate: deleteIssue, isLoading: isRemovingIssue } = useDeleteIssue();

  const onDelete = useCallback(
    (issueId: string) => {
      deleteIssue({ issueId });
    },
    [deleteIssue]
  );

  const [issueToCreate, setIssueToCreate] = useState<Issue>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCreate = useCallback(
    (issue: Issue) => {
      setIssueToCreate(issue);
      onOpen();
    },
    [onOpen]
  );

  const renderIssueItem = useCallback(
    (issue: Issue) => (
      <IssueItem
        issue={issue}
        onDelete={onDelete}
        isDeleting={isRemovingIssue}
        onOpen={() => onCreate(issue)}
      />
    ),
    [onDelete, isRemovingIssue, onCreate]
  );

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

      <ListView<Issue>
        items={sortedIssues}
        render={renderIssueItem}
        isLoading={isLoadingIssues}
      />

      <ScheduleModal issue={issueToCreate} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
