import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ApproveButton } from '.';

describe('ApproveButton', () => {
  it('deve exibir o botão de aprovação e interagir corretamente', () => {
    const handleApproveHomolog = jest.fn();
    const passDateTime = new Date();

    const { getByText, getByLabelText } = render(
      <ApproveButton
        label="Aprovar"
        handleApproveHomolog={handleApproveHomolog}
        passDateTime={passDateTime}
      />
    );

    // Verificar se o botão de aprovação está presente
    const button = getByText('Aprovar Atendimento');
    expect(button).toBeInTheDocument();

    // Simular clique no botão de aprovação
    fireEvent.click(button);
    expect(handleApproveHomolog).toHaveBeenCalledTimes(1);

    // Verificar se o campo de data está presente e tem o valor correto
    const dateTimeInput = getByLabelText('Data do Evento');
    expect(dateTimeInput).toBeInTheDocument();
    expect(dateTimeInput.value).toEqual(
      passDateTime.toISOString().substring(0, 16)
    );
  });

  it('deve adicionar e remover alertas corretamente', () => {
    const handleApproveHomolog = jest.fn();
    const passDateTime = new Date();

    const { getByText, getByLabelText, getAllByLabelText } = render(
      <ApproveButton
        label="Aprovar"
        handleApproveHomolog={handleApproveHomolog}
        passDateTime={passDateTime}
      />
    );

    // Simular clique no botão "Adicionar Alerta"
    const addButton = getByText('Adicionar Alerta');
    fireEvent.click(addButton);

    // Verificar se o campo de alerta foi adicionado
    const alertInputs = getAllByLabelText('alert_dates');
    expect(alertInputs.length).toBe(1);

    // Simular clique no botão de remover alerta
    const deleteButton = getByLabelText('Excluir Alerta 1');
    fireEvent.click(deleteButton);

    // Verificar se o campo de alerta foi removido
    const updatedAlertInputs = getAllByLabelText('alert_dates');
    expect(updatedAlertInputs.length).toBe(0);
  });
});