import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';
import { ChamadoForm } from '@/features/issues/components/issue-form';
import { CreateIssueForm } from '@/features/issues/components/issue-form/create-issue-form';

export function RegistrarChamado() {
  const navigate = useNavigate();

  /* const onSubmit = useCallback(async (data: ChamadoFormValues) => {
     console.log('data', data);

  const newData: ChamadoFormValues = { ...data, problems: [] };

     const payload = formValuesToPayload(newData);
     console.log('payload', payload);

     const response = await request<Chamado>(createChamado(payload));

     if (response.type === 'error') {
       toast.error(response.error.message);

       return Promise.reject(response.error.message);
     }

     toast.success(response.value.message);
   }, []); */

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
