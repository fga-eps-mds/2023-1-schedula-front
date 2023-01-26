import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllIssues } from '@/features/issues/api/get-all-issues';
import { Issue } from '@/features/issues/types';
import { useDeleteIssue } from '@/features/issues/api/delete-issue';
import { ListView } from '@/components/list';
import { IssueItem } from '@/features/issues/components/issue-item';

export function Chamados() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: issues,
    isLoading: isLoadingIssues,
    refetch,
  } = useGetAllIssues();

  const { mutate: deleteIssue, isLoading: isRemovingIssue } = useDeleteIssue();

  const [issueToEdit, setIssueToEdit] = useState<Issue>();

  const onEdit = useCallback(
    (issue: Issue) => {
      setIssueToEdit(issue);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (issueId: string) => {
      deleteIssue({ issueId });
    },
    [deleteIssue]
  );

  const handleClose = useCallback(() => {
    setIssueToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderIssueItem = useCallback(
    (issue: Issue) => (
      <IssueItem
        issue={issue}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isRemovingIssue}
      />
    ),
    [onDelete, onEdit, isRemovingIssue]
  );

  return (
    <>
      <PageHeader title="Chamados">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Link to="/chamados/registrar">
            <Button variant="primary">Novo Chamado</Button>
          </Link>
        </HStack>
      </PageHeader>

      <ListView<Issue>
        items={issues}
        render={renderIssueItem}
        isLoading={isLoadingIssues}
      />

      {/* <IssueModal
        isOpen={isOpen}
        onClose={handleClose}
        chamado={issueToEdit}
        onSubmit={onSubmit}
      /> */}
    </>
  );
}
