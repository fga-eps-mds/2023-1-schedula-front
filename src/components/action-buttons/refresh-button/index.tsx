import { useCallback, useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import { ActionButton } from '..';

interface RefreshButtonProps {
  refresh: () => Promise<unknown>;
}

export function RefreshButton({ refresh }: RefreshButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    refresh?.().finally(() => setIsLoading(false));
    console.log('Refresh clicado');
  }, [refresh]);

  return (
    <ActionButton
      icon={<FaSyncAlt />}
      label="Atualizar Dados"
      onClick={handleRefresh}
      isLoading={isLoading}
      variant="outline"
    />
  );
}
