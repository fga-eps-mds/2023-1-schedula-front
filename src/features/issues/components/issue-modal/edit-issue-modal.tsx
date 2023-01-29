import { useCallback, useMemo } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import {
  Issue,
  IssuePayload,
  PutUpdateIssueParams,
} from '@/features/issues/types';
import { usePutUpdateIssue } from '@/features/issues/api/put-update-issue';

interface IssueModalProps extends Partial<ModalProps> {
  issue?: Issue;
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
      city_payload,
      date,
      email,
      phone,
      problem_category_payload,
      problem_types_payload,
      requester,
      workstation_payload,
    }: IssuePayload) => {
      const payload: PutUpdateIssueParams = {
        issueId,
        data: {
          requester,
          phone,
          city_id: city_payload?.value,
          date,
          email,
          problem_category_id: problem_category_payload?.value,
          problem_types_ids: problem_types_payload?.map((type) => type?.value),
          workstation_id: workstation_payload?.value,
        },
      };

      updateIssue({
        issueId: issue?.id ?? '',
        data: {
          requester,
          phone,
          city_id: city_payload?.value,
          date,
          email,
          problem_category_id: problem_category_payload?.value,
          problem_types_ids: problem_types_payload?.map((type) => type?.value),
          workstation_id: workstation_payload?.value,
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
      {/* <IssueForm
        issue={issue}
        onSubmit={handleSubmit}
        isSubmitting={isUpdatingIssue}
      /> */}
    </Modal>
  );
}
