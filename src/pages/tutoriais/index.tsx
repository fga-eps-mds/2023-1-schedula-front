import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { PageHeader } from '@/components/page-header';

export function Tutoriais() {
  const navigate = useNavigate();

  return (
    <PageHeader title="Tutoriais">
      <Button
        variant="primary"
        onClick={() => navigate('categorias_de_tutorial')}
      >
        Gerenciamento de categorias
      </Button>
    </PageHeader>
  );
}
