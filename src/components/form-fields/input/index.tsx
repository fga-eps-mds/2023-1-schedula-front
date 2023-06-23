/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  InputAddonProps,
  InputElementProps,
  InputGroup,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  label: string | JSX.Element;
  errors?: FieldError | undefined | any;
  rightElement?: ReactElement<InputElementProps>;
  leftElement?: ReactElement<InputElementProps>;
  rightAddon?: ReactElement<InputAddonProps>;
  leftAddon?: ReactElement<InputAddonProps>;
}

export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const {
    label,
    errors,
    rightElement,
    leftElement,
    rightAddon,
    leftAddon,
    ...rest
  } = props;

  return (
    <FormControl isInvalid={Boolean(errors)}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {leftAddon ?? null}
        {leftElement ?? null}
        <ChakraInput {...rest} ref={ref} />
        {rightAddon ?? null}
        {rightElement ?? null}
      </InputGroup>
      <FormErrorMessage>{errors?.message}</FormErrorMessage>
    </FormControl>
  );
});
