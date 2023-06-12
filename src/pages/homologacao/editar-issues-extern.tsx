import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { CreateIssueForm } from '@/features/issues/components/issue-form/create-issue-form';

export function EditarChamadoExterno() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Editar Atendimento Externo">
        <Button variant="primary" onClick={() => navigate('/homologacao')}>
          Ver Atendimentos
        </Button>
      </PageHeader>

      <CreateIssueForm />
    </>
  );
}
