import { PageHeader } from '@/components/page-header';
import { CreateIssueForm } from '@/features/homologations/components/issue-open-form/create-issue-form-open';

export function RegistrarAgendamento() {
  return (
    <>
      <PageHeader title="Novo Agendamento">{}</PageHeader>

      <CreateIssueForm />
    </>
  );
}
