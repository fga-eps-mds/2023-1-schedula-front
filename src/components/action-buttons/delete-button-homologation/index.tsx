import { useCallback, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  Button,
  Flex,
  Heading,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { ActionButtonProps } from '../types';
import { ActionButton } from '..';

type DeleteButtonProps<Data> = ActionButtonProps<Data>;

const tooltipStyle = {
  bg: 'red.500',
  color: 'white',
};

export function DeleteButton<Data>({
  label,
  onClick,
  ...props
}: DeleteButtonProps<Data>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [justification, setJustification] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    await (onClick as (justification: string) => void)?.(justification);
    onClose?.();
    setIsLoading(false);
  }, [onClose, onClick, justification]);

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="auto">
      <PopoverAnchor>
        <ActionButton
          label={`Reprovar ${label}`}
          icon={<FaTrash />}
          onClick={onOpen}
          isLoading={isLoading}
          color="red.500"
          tooltipProps={tooltipStyle}
          tabIndex={0}
          {...props}
        />
      </PopoverAnchor>
      <PopoverContent
        left="-100%"
        data-testid="delete-confirmation-popover"
        border={0}
        borderRadius="base"
        bg="blackAlpha.600"
        backdropFilter="blur(8px)"
        color="white"
      >
        <PopoverArrow />
        <PopoverCloseButton color="white" top={2} right={2} />

        <PopoverHeader
          bg="blackAlpha.600"
          textAlign="center"
          borderTopRadius="base"
          border={0}
        >
          <Heading size="md" color="white" fontWeight="semibold">
            Reprovar homologação
          </Heading>
        </PopoverHeader>

        <PopoverBody bg="blackAlpha.300" textAlign="center">
          <Text>Você realmente deseja reprovar a homologação?</Text>
          <Text fontStyle="italic" mt={1}>
            Justifique o motivo da reprovação:
          </Text>
          <Textarea
            placeholder="Justificativa"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            mt={4}
            minHeight="150px"
          />
        </PopoverBody>

        <PopoverFooter borderBottomRadius="base" border={0} bg="blackAlpha.300">
          <Flex justifyContent="space-between">
            <Button onClick={onClose} variant="solid" colorScheme="blackAlpha">
              Cancelar
            </Button>
            <Button
              onClick={() => handleDelete(justification)}
              colorScheme="red"
              variant="solid"
            >
              Reprovar
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
