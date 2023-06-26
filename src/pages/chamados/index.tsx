import { Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
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
  const sortedIssues = sortIssues(issues);

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
    </>
  );
}
