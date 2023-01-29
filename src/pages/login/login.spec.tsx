import { fireEvent, render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from '@/pages/login';
import { theme } from '@/styles/theme';

describe('Login page', () => {
  it('should have a form', async () => {
    const { findByRole } = render(
      <ChakraProvider resetCSS theme={theme}>
        <Login />
      </ChakraProvider>
    );

    const form = await findByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should have wellcome text', async () => {
    const { findByText } = render(
      <ChakraProvider resetCSS theme={theme}>
        <Login />
      </ChakraProvider>
    );

    const wellcome = await findByText('Bem-vindo');

    expect(wellcome).toBeInTheDocument();
  });

  it('should display error message when any field is empty', async () => {
    const { findByText, findAllByText } = render(
      <ChakraProvider resetCSS theme={theme}>
        <Login />
      </ChakraProvider>
    );

    const button = await findByText('ENTRAR');

    fireEvent.click(button);

    const message = await findAllByText('Este campo é obrigatório');

    expect(message).toHaveLength(2);
  });
});
