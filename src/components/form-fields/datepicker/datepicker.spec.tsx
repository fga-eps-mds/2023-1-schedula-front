import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Datepicker } from '@/components/form-fields/datepicker';

describe('Datepicker', () => {
  it('should have the correct value', async () => {
    function Component() {
      const { control } = useForm<Chamado>();

      return Datepicker({
        name: 'created_at',
        control,
        id: '',
        label: 'datepicker',
      });
    }

    render(<Component />);

    const datePicker = screen.getByLabelText('datepicker') as HTMLInputElement;
    fireEvent.click(datePicker);

    await waitFor(() =>
      fireEvent.change(datePicker, { target: { value: '01/02/2020 2:50 PM' } })
    );

    expect(datePicker.value).toBe('01/02/2020 2:50 PM');
  });
});
