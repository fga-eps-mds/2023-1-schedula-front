import { Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllIssues } from '@/features/homologations/api/get-all-extern-issues';
import { ExternIssue } from '@/features/issues/types';
import { Permission } from '@/components/permission';
import { ListView } from '@/components/list';
import { ExternIssueItem } from '@/features/homologations/components/extern-issue-item';
import { useDeleteHomologation } from '@/features/homologations/api/delete-extern-issue';

export function GerenciarHomologacao() {
  const {
    data: externIssues,
    isLoading: isLoadingExternIssues,
    refetch,
  } = useGetAllIssues();

  const { mutate: deleteIssues, isLoading: isDeletingIssue } =
    useDeleteHomologation();

  const onDelete = useCallback(
    (id: string) => {
      deleteIssues({ id });
    },
    [deleteIssues]
  );

  const renderExternIssueItem = useCallback(
    (externIssue: ExternIssue) => (
      <ExternIssueItem
        externIssue={externIssue}
        onDelete={onDelete}
        isDeleting={isDeletingIssue}
      />
    ),
    [onDelete, isDeletingIssue]
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
