import { render } from '@testing-library/react';
import { AlertItem } from '@/features/alerts/components/alert-item';
import { Alert } from '@/features/alerts/api/types';

const mockedAlert: Alert = {
  id: '11d2d5b0-6a5a-4b5b-b99c-c3c3d0e04e66',
  sourceName: 'Filipe Souto',
  sourceEmail: 'filipe50@email.com',
  targetName: 'Arthur Rodrigues',
  targetEmail: 'arthur992@email.com',
  message: 'Olhe o chamado n° 46',
  status: 'unsolved',
  pendency: '',
  read: false,
  createdAt: new Date(),
};

describe('AlertItem', () => {
  it('should render alert target name and message', async () => {
    const { findAllByText } = render(<AlertItem alert={mockedAlert} />);

    const alertTargetName = await findAllByText('Arthur Rodrigues');
    expect(alertTargetName[0]).toBeInTheDocument();

    const alertMessage = await findAllByText('Olhe o chamado n° 46');
    expect(alertMessage[0]).toBeInTheDocument();
  });
});
