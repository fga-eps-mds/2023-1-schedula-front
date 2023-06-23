import { NotificacaoAdmin } from './notificacoes_admin';
import { NotificacaoUsuario } from './notificacoes_usuario';
import { Permission } from '@/components/permission';

export function Notificacoes() {
  return (
    <>
      <Permission allowedRoles={['BASIC']}>
        <NotificacaoUsuario />
      </Permission>
      <Permission allowedRoles={['ADMIN']}>
        <NotificacaoAdmin />
      </Permission>
    </>
  );
}
