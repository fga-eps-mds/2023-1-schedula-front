import { PageHeader } from '@/components/page-header';
import { CreateIssueForm } from '@/features/issues/components/issue-form/create-issue-form-open';

export function RegistrarAgendamento() {
  return (
    <>
      <PageHeader title="Novo Agendamento">{}</PageHeader>

      <CreateIssueForm />
    </>
  );
}
