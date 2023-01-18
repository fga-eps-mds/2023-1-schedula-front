/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const events = [
  'load',
  'mousemove',
  'mousedown',
  'click',
  'scroll',
  'keypress',
];

const THIRTY_MINUTES_IN_MS = 60000 * 2;

export function AutoLogoutComponent({ children }: { children: ReactNode }) {
  const { signOut } = useAuth();
  const timer = useRef<NodeJS.Timeout>();

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, [timer]);

  const handleLogoutTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      resetTimer();

      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });

      signOut();
    }, THIRTY_MINUTES_IN_MS);
  }, [signOut, resetTimer]);

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });

    return Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer);
    });
  }, [handleLogoutTimer, resetTimer]);

  return <>{children}</>;
}
