import { NotificacaoUsuario } from './notificacoes_usuario';
import { Permission } from '@/components/permission';

export function Notificacoes() {
  return (
    <Permission allowedRoles={['BASIC']}>
      <NotificacaoUsuario />
    </Permission>
  );
}
