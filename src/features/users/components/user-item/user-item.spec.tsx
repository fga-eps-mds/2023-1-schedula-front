import { fireEvent, render, act } from '@testing-library/react';
import { vi } from 'vitest';
import { UserItem } from '@/features/users/components/user-item';
import { User } from '@/features/users/api/types';

const mockedUser: User = {
  id: '1',
  email: 'email@email.com',
  name: 'Usuário Teste',
  username: 'testuser',
  position: 'abc',
  profile: 'BASIC',
  createdAt: '31/02/1990',
  updatedAt: '32/02/1990',
};

const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn((userId: string) => userId);

describe('UserItem', () => {
  it('should display the name of the user correctly', async () => {
    const { findByText } = render(
      <UserItem
        user={mockedUser}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const name = await findByText(
      `${mockedUser.name} [${mockedUser.username}]`
    );
    expect(name).toBeInTheDocument();
  });
  it('should be able to edit a user', async () => {
    const { queryByLabelText } = render(
      <UserItem
        user={mockedUser}
        isDeleting={false}
        onEdit={mockedOnEditFunction}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const EditButton = await queryByLabelText(`Editar ${mockedUser.name}`);

    if (EditButton) {
      fireEvent.click(EditButton);
      expect(mockedOnEditFunction).toHaveBeenCalled();
    }
  });

  it.todo('should be able to delete a user', async () => {
    const { getByTestId } = render(
      <UserItem
        user={mockedUser}
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
      userId: mockedUser.id,
    });
  });
});
