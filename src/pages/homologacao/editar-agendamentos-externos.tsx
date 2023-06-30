import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { UpdateExternIssueForm } from '@/features/homologations/components/issue-open-edit-form';

export function EditarChamadoExterno() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Editar Agendamento Externo">
        <Button variant="primary" onClick={() => navigate('/homologacao')}>
          Ver Homologações
        </Button>
      </PageHeader>

      <UpdateExternIssueForm />
    </>
  );
}
