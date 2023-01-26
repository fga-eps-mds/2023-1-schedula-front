import { useCallback, useMemo } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { ChamadoFormWrapper } from '@/features/issues/components/issue-form/chamado-form-wrapper';
import {
  Issue,
  IssuePayload,
  PostCreateIssueParams,
  PutUpdateIssueParams,
} from '@/features/issues/types';
import { usePutUpdateIssue } from '@/features/issues/api/put-update-issue';

interface IssueModalProps extends Partial<ModalProps> {
  issue: Issue;
  isOpen: boolean;
  onClose: () => void;
}

export function IssueModal({
  issue,
  isOpen,
  onClose,
  ...props
}: IssueModalProps) {
  const { mutate: updateIssue, isLoading: isUpdatingIssue } = usePutUpdateIssue(
    {
      onSuccessCallBack: onClose,
    }
  );

  const handleSubmit = useCallback(
    async ({
      issueId,
      city_id,
      date,
      email,
      phone,
      problem_category_id,
      problem_types_ids,
      requester,
      workstation_id,
    }: IssuePayload) => {
      const payload: PutUpdateIssueParams = {
        issueId,
        data: {
          requester,
          phone,
          city_id,
          date,
          email,
          problem_category_id,
          problem_types_ids,
          workstation_id,
        },
      };

      updateIssue({
        issueId: issue.id,
        data: {
          requester,
          phone,
          city_id,
          date,
          email,
          problem_category_id,
          problem_types_ids,
          workstation_id,
        },
      });
    },
    [updateIssue, issue?.id]
  );

  return (
    <Modal
      title="Editar Chamado"
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      {...props}
    >
      {/* <ChamadoFormWrapper defaultValues={chamado} onSubmit={handleSubmit} /> */}
    </Modal>
  );
}
