import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { CreateIssueForm } from '@/features/issues/components/issue-form/create-issue-form';

export function RegistrarChamado() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Novo Chamado">
        <Button variant="primary" onClick={() => navigate('/chamados')}>
          Ver Chamados
        </Button>
      </PageHeader>

      <CreateIssueForm />
    </>
  );
}
