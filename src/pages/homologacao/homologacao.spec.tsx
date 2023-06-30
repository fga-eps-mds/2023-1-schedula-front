import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { GerenciarHomologacao } from '@/pages/homologacao';
import { EditarChamadoExterno } from '@/pages/homologacao/editar-agendamentos-externos';

import 'intersection-observer';

beforeAll(() => {
  vi.mock('@/features/homologations/api/get-all-extern-issues', () => ({
    useGetAllIssues: vi.fn().mockReturnValue({
      id: '1',
      requester: 'Mockerson',
      phone: '61988554474',
      city_id: '123',
      workstation_id: '123',
      problem_category_id: 'Category Mock',
      problem_types_ids: ['Type Mock'],
      date: new Date(),
      email: 'mockerson@mock.com',
      applicant_name: 'Mockerson1',
      applicant_phone: '61388554474',
    }),
  }));
});

const queryClient = new QueryClient();

describe('Issues page', () => {
  // it('should display a heading', async () => {
  //   const { findByRole } = render(
  //     <BrowserRouter>
  //       <QueryClientProvider client={queryClient}>
  //         <GerenciarHomologacao />
  //       </QueryClientProvider>
  //     </BrowserRouter>
  //   );

  //   const heading = await findByRole('heading');
  //   expect(heading).toHaveTextContent('Homologação');
  // });

  it('should display a list', async () => {
    const { findByRole } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GerenciarHomologacao />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const list = await findByRole('list');
    expect(list).toBeInTheDocument();
  });

  // it('should display a refresh button', async () => {
  //   const { findByRole } = render(
  //     //<BrowserRouter>
  //       <QueryClientProvider client={queryClient}>
  //         <GerenciarHomologacao />
  //       </QueryClientProvider>
  //     //</BrowserRouter>
  //   );

  //   const button = await findByRole('button', { name: 'Atualizar Dados' });
  //   expect(button).toBeInTheDocument();
  // });
});

// it('should display a show homolog button', async () => {
//   const { findByRole } = render(
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <EditarChamadoExterno />
//       </QueryClientProvider>
//     </BrowserRouter>
//   );

//   const button = await findByRole('button', { name: 'Ver Homologações' });
//   expect(button).toBeInTheDocument();
// });
