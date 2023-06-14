import { fireEvent, render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '@/pages/login';
import { theme } from '@/styles/theme';

describe('Login page', () => {
  it('should have a form', async () => {
    const { findByRole } = render(
      <Router>
        <ChakraProvider resetCSS theme={theme}>
          <Login />
        </ChakraProvider>
      </Router>
    );

    const form = await findByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should have wellcome text', async () => {
    const { findByText } = render(
      <Router>
        <ChakraProvider resetCSS theme={theme}>
          <Login />
        </ChakraProvider>
      </Router>
    );

    const wellcome = await findByText('Bem-vindo');

    expect(wellcome).toBeInTheDocument();
  });

  it('should display error message when any field is empty', async () => {
    const { findByText, findAllByText } = render(
      <Router>
        <ChakraProvider resetCSS theme={theme}>
          <Login />
        </ChakraProvider>
      </Router>
    );

    const button = await findByText('ENTRAR');

    fireEvent.click(button);

    const message = await findAllByText('Este campo é obrigatório');

    expect(message).toHaveLength(2);
  });
});
