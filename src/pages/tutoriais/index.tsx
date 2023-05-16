import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { PageHeader } from '@/components/page-header';
import { GerenciarTutoriais } from '../gerenciar-tutorial';

export function Tutoriais() {
  const navigate = useNavigate();

  return (
    <PageHeader title="Tutoriais">
      <Button variant="primary" onClick={() => navigate('gerenciar-tutorial')}>
        Gerenciar tutoriais
      </Button>
    </PageHeader>
  );
}
