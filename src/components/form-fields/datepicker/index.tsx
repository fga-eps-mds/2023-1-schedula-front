import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { BsCalendar3 } from 'react-icons/bs';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import pt from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

type Props<FormValues extends FieldValues> = Omit<
  ReactDatePickerProps,
  'onChange'
> &
  UseControllerProps<FormValues> & {
    label: string;
  };

export function Datepicker<FormValues extends FieldValues>({
  control,
  name,
  id,
  label,
  rules,
  ...props
}: Props<FormValues>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControl isInvalid={!!error} id={id} cursor="pointer" userSelect="none">
      <FormLabel cursor="pointer">{label}</FormLabel>

      <InputGroup display="block">
        <ReactDatePicker
          selected={value as Date}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value as string}
          locale="pt"
          dateFormat="dd/MM/yyyy h:mm aa"
          minDate={new Date()}
          showTimeInput
          timeInputLabel="Hora"
          fixedHeight
          customInput={<Input />}
          {...props}
        />
        <InputRightElement color="gray.500" pointerEvents="none" zIndex={-1}>
          <Icon as={BsCalendar3} color="primary" fontSize="lg" />
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}
