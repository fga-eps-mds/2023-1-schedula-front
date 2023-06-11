import { Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllIssues } from '@/features/issues/api/get-all-issues';
import { ExternIssue } from '@/features/issues/types';
import { Permission } from '@/components/permission';
import { ListView } from '@/components/list';
import { ExternIssueItem } from '@/features/issues/components/extern-issue-item';

export function GerenciarHomologacao() {
  const {
    data: externIssues,
    isLoading: isLoadingExternIssues,
    refetch,
  } = useGetAllIssues();

  const renderExternIssueItem = useCallback(
    (externIssue: ExternIssue) => <ExternIssueItem externIssue={externIssue} />,
    []
  );

  return (
    <>
      <PageHeader title="Homologação">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN']}>
            <Link to="/chamados/registrar">
              <Button variant="primary">Novo Atendimento</Button>
            </Link>
          </Permission>
        </HStack>
      </PageHeader>

      <ListView<ExternIssue>
        items={externIssues}
        render={renderExternIssueItem}
        isLoading={isLoadingExternIssues}
      />
    </>
  );
}
