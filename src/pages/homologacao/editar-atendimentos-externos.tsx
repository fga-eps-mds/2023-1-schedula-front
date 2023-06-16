import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { CreateExternIssueForm } from '@/features/homologations/components/extern-issue-edit-form';

export function EditarChamadoExterno() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Editar Agendamento Externo">
        <Button variant="primary" onClick={() => navigate('/homologacao')}>
          Ver Homologações
        </Button>
      </PageHeader>

      <CreateExternIssueForm />
    </>
  );
}
