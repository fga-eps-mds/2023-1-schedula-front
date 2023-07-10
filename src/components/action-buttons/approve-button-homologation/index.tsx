import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  Box,
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
  useDisclosure,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { ActionButtonProps } from '../types';
import { ActionButton } from '..';
import { Input } from '@/components/form-fields/input';
import { IssuePayloadOpen } from '@/features/issues/types';
import { parseSelectedDatetime } from '@/utils/format-date';

interface ApproveButtonProps<Data> extends ActionButtonProps<Data> {
  handleApproveHomolog: (justify: string, dateTime: Date) => void;
  passDateTime: Date;
}

const tooltipStyle = {
  bg: 'green.500',
  color: 'white',
};

export function ApproveButton<Data>({
  label,
  onClick,
  passDateTime,
  ...props
}: ApproveButtonProps<Data>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [justification] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, register } = useForm<IssuePayloadOpen>({
    defaultValues: {
      dateTime: passDateTime ?? '',
    },
  });

  const dateTime = watch('dateTime');

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="auto">
      <PopoverAnchor>
        <ActionButton
          label={`${label}`}
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
        height="200%"
        width="150%"
        left="-175%"
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
            Confirmação
          </Heading>
        </PopoverHeader>

        <PopoverBody bg="blackAlpha.300" textAlign="center">
          <Box>
            <Controller
              control={control}
              name="dateTime"
              rules={{
                min: {
                  value: new Date().toISOString(),
                  message: 'Informe uma data no futuro.',
                },
              }}
              render={({
                field: { onChange, onBlur, ref },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    {...register('dateTime')}
                    label="Data do Evento"
                    type="datetime-local"
                    name="dateTime"
                    id="dateTime"
                    min={parseSelectedDatetime(String(new Date()))}
                    onChange={onChange}
                    ref={ref}
                    onBlur={onBlur}
                    value={parseSelectedDatetime(String(watch('dateTime')))}
                  />
                  <Text color="red.100" mt=".5rem">
                    {error ? error.message : null}
                  </Text>
                </>
              )}
            />
          </Box>
        </PopoverBody>

        <PopoverFooter borderBottomRadius="base" border={0} bg="blackAlpha.300">
          <Flex justifyContent="space-between">
            <Button
              // only push dateTime if it is bigger than now

              onClick={() =>
                props.handleApproveHomolog(justification, dateTime)
              }
              colorScheme="green"
              variant="solid"
              size="lg"
              width="100%"
              mt={8}
            >
              Aprovar Atendimento
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
