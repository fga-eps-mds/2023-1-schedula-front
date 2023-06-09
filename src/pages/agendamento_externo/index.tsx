import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { CreateIssueForm } from '@/features/issues/components/issue-form/create-issue-form2';

export function RegistrarAgendamento() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Novo Agendamento">
        {/* <Button variant="primary" onClick={() => navigate('/agendamento_externo/abertos')}>
          Agendamentos Abertos
        </Button> */}
      </PageHeader>

      <CreateIssueForm />
    </>
  );
}
