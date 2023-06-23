import { HStack } from '@chakra-ui/react';
import { Item } from '@/components/list-item';
import { Alert } from '@/features/alerts/api/types';

interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  return (
    <div>
      <Item
        title={`${alert?.targetName}`}
        description={
          <HStack spacing={2} mt={2.5}>
            <p>{alert?.message}</p>
          </HStack>
        }
      />
    </div>
  );
}
