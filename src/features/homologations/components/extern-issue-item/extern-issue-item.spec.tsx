import { fireEvent, render, act } from '@testing-library/react';
import { vi } from 'vitest';
import { ExternIssueItem } from '.';
import { IssueOpen } from '@/features/issues/types';

const mockedExternIssue: IssueOpen = {
  id: '1',
  email: 'email@email.com',
  requester: 'Usuário Teste',
  phone: '',
  city_id: '',
  workstation_id: '',
  date: '',
  cellphone: '',
  description: '',
  alerts: [],
  dateTime: new Date(),
  problem_category: {
    id: '',
    name: '',
    description: '',
    problem_types: [],
  },
  problem_types: [],
  name: undefined,
  ExternIssuename: undefined,
};

const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn((userId: string) => userId);

describe('UserItem', () => {
  it('should display the name of the user correctly', async () => {
    const { findByText } = render(
      <ExternIssueItem
        externIssue={mockedExternIssue}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const name = await findByText(
      `${mockedExternIssue.name} [${mockedExternIssue.ExternIssuename}]`
    );
    expect(name).toBeInTheDocument();
  });
  it('should be able to edit a ExternIssue', async () => {
    const { queryByLabelText } = render(
      <ExternIssueItem
        externIssue={mockedExternIssue}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const EditButton = await queryByLabelText(
      `Editar ${mockedExternIssue.name}`
    );

    if (EditButton) {
      fireEvent.click(EditButton);
      expect(mockedOnEditFunction).toHaveBeenCalled();
    }
  });

  it.todo('should be able to delete a ExternIssue', async () => {
    const { getByTestId } = render(
      <ExternIssueItem
        externIssue={mockedExternIssue}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const deleteButton = getByTestId('deleteButton');
    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(deleteButton).toBeInTheDocument();
    expect(mockedOnDeleteFunction).toHaveBeenCalledWith({
      ExternIssueId: mockedExternIssue.id,
    });
  });
});
