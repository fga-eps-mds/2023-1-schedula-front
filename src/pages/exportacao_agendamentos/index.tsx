/* eslint-disable import/no-extraneous-dependencies */
import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllSchedules } from '@/features/schedules/api/get-all-schedules';
import { ScheduleTableItem } from '@/features/schedules/components/schedule-table-item';
import { Schedule } from '@/features/schedules/types';
import { formatDate } from '@/utils/format-date';
import { useGetAllWorkstations } from '@/features/workstations/api/get-all-workstations';

export function ScheduleExport() {
  const { data: schedules, refetch } = useGetAllSchedules();
  const [selectedSchedules, setSelectedSchedules] = useState<Schedule[]>([]);

  const { data: workstations } = useGetAllWorkstations();

  function handleExportSchedules() {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();

    const tableColumn = [
      'Status',
      'Atendente',
      'Solicitante',
      'Data',
      'Posto de Trabalho',
      'Telefone',
      'Descrição',
    ];
    const tableRows: string[][] = [];

    selectedSchedules.forEach((schedule) => {
      const workstation = workstations?.find((workstation) => {
        return workstation?.id === schedule?.issue.workstation_id;
      });
      const ticketData: string[] | any = [
        schedule.status,
        schedule.issue.email,
        schedule.issue.requester,
        formatDate(schedule.dateTime),
        workstation?.name,
        schedule.issue.phone,
        schedule.description,
      ];
      tableRows.push(ticketData);
    });

    /* Cria a tabela e altera as margens do documento */
    (doc as any).autoTable(tableColumn, tableRows, {
      startY: 20,
      margin: 3,
      columnStyles: {
        1: { cellWidth: 40 },
        6: { minCellWidth: 50 },
      },
    });
    doc.text('Lista de agendamentos', 3, 15);
    doc.save(`agendamentos.pdf`);
  }

  return (
    <>
      <PageHeader title="Agendamentos">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
        </HStack>
      </PageHeader>

      <Button alignSelf="end" my="2rem" onClick={handleExportSchedules}>
        Exportar
      </Button>

      <TableContainer>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th />
              <Th>Status</Th>
              <Th>Atendente</Th>
              <Th>Solicitante</Th>
              <Th>Data</Th>
              <Th>Posto de Trabalho</Th>
              <Th>Telefone</Th>
              <Th>Descrição</Th>
            </Tr>
          </Thead>
          <Tbody>
            {schedules?.map((schedule) => (
              <ScheduleTableItem
                key={schedule.id}
                schedule={schedule}
                selectedSchedules={selectedSchedules}
                setSelectedSchedules={setSelectedSchedules}
                workstation={workstations?.find((workstation) => {
                  return workstation?.id === schedule?.issue.workstation_id;
                })}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
