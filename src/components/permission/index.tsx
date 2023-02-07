/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionProps {
  allowedRoles: Array<'ADMIN' | 'BASIC' | 'USER'>;
  allowCreatedByUserEmail?: string;
  children: ReactNode;
}

export function Permission({
  allowedRoles,
  allowCreatedByUserEmail,
  children,
}: PermissionProps) {
  const { user } = useAuth();
  const isCreatedBySelf = user?.email === allowCreatedByUserEmail ?? false;
  const role = user?.profile ?? 'USER';
  const isAuthorized = allowedRoles.includes(role);

  if (!isAuthorized) {
    return null;
  }

  if (!!allowCreatedByUserEmail && !isCreatedBySelf) {
    return null;
  }

  return <>{children}</>;
}
