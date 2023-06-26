import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IssueItem } from '@/features/issues/components/issue-item';
import { Issue } from '@/features/issues/types';

const mockedIssue: Issue = {
  id: '1',
  requester: 'Mockerson',
  phone: '61988554474',
  city_id: '123',
  workstation_id: '123',
  email: 'mcok@email.com',
  date: '2021-10-10',
  problem_category: {
    id: '1',
    name: 'Category Mock',
    description: 'Category Mock',
    problem_types: [
      {
        id: '1',
        name: 'Type Mock',
      },
    ],
  },
  problem_types: [
    {
      id: '1',
      name: 'Type Mock',
    },
  ],
};

const mockedOnDeleteFunction = vi.fn((itemId: string) => itemId);

describe('IssueItem', () => {
  const queryClient = new QueryClient();

  it('should display the name of the requester correctly', async () => {
    const { findAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <IssueItem
          issue={mockedIssue}
          isDeleting={false}
          onDelete={mockedOnDeleteFunction}
        />
      </QueryClientProvider>
    );

    const name = await findAllByText(mockedIssue.requester);
    expect(name[0]).toBeInTheDocument();
  });

  it('should be able to delete a item', async () => {
    const { queryByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <IssueItem
          issue={mockedIssue}
          isDeleting={false}
          onDelete={mockedOnDeleteFunction}
        />
      </QueryClientProvider>
    );

    const deleteButton = queryByLabelText(`Excluir atendimento`);
    if (deleteButton) {
      expect(deleteButton).toBeInTheDocument();
    }
  });
});
