import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { PageHeader } from '@/components/page-header';
import { GerenciarTutoriais } from '../gerenciar-tutorial';
import { ListView } from '@/components/list';
import { User } from '@/features/users/api/types';
import { UserItem } from '@/features/users/components/user-item';
import { useDeleteRemoveUser } from '@/features/users/api/delete-remove-user';
import { useGetAllUsers } from '@/features/users/api/get-all-users';

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
      <Button variant="primary" onClick={() => navigate('gerenciar-tutorial')}>
        Gerenciar tutoriais
      </Button>
    </PageHeader>
  );
}
