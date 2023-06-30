import { HStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllIssues } from '@/features/homologations/api/get-all-issues-open';
import { IssueOpen } from '@/features/issues/types';
import { Permission } from '@/components/permission';
import { ListView } from '@/components/list';
import { ExternIssueItem } from '@/features/homologations/components/issue-open-item';
import { useDeleteHomologation } from '@/features/homologations/api/delete-issue-open';

export function GerenciarHomologacao() {
  const {
    data: externIssues,
    isLoading: isLoadingExternIssues,
    refetch,
  } = useGetAllIssues();

  const [externIssuesHomologList, setExternIssuesHomologList] = useState<
    Array<IssueOpen> | any
  >([]);

  useEffect(() => {
    if (externIssues) {
      setExternIssuesHomologList(externIssues);
    }
  }, [isLoadingExternIssues, externIssues]);

  const { mutate: deleteIssues, isLoading: isDeletingIssue } =
    useDeleteHomologation();

  const onDelete = useCallback(
    (id: string) => {
      deleteIssues({ id });
    },
    [deleteIssues]
  );

  const renderExternIssueItem = useCallback(
    (externIssue: IssueOpen) => {
      if (externIssue.isHomolog) {
        return null as unknown as JSX.Element;
      }

      return (
        <ExternIssueItem
          externIssue={externIssue}
          onDelete={onDelete}
          isDeleting={isDeletingIssue}
        />
      );
    },
    [onDelete, isDeletingIssue]
  );

  return (
    <>
      <Permission allowedRoles={['ADMIN']}>
        <PageHeader title="Homologação">
          <HStack spacing={2}>
            <RefreshButton refresh={refetch} />
          </HStack>
        </PageHeader>
      </Permission>

      <ListView<IssueOpen>
        items={externIssues}
        render={renderExternIssueItem}
        isLoading={isLoadingExternIssues}
      />
    </>
  );
}
