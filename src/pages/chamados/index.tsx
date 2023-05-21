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

export function Chamados() {
  const {
    data: issues,
    isLoading: isLoadingIssues,
    refetch,
  } = useGetAllIssues();

  const renderIssueItem = useCallback(
    (issue: Issue) => <IssueItem issue={issue} />,
    []
  );

  return (
    <>
      <PageHeader title="Chamados">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN', 'BASIC']}>
            <Link to="/chamados/registrar">
              <Button variant="primary">Novo Chamado</Button>
            </Link>
          </Permission>
        </HStack>
      </PageHeader>

      <ListView<Issue>
        items={issues}
        render={renderIssueItem}
        isLoading={isLoadingIssues}
      />
    </>
  );
}
