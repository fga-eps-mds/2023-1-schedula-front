/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionProps {
  allowedRoles: string[];
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
  const isAdmin = role === 'ADMIN';

  if (!isAuthorized) {
    return null;
  }

  if (!!allowCreatedByUserEmail && !isCreatedBySelf && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
