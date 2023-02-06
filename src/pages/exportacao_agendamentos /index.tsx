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

export function ScheduleExport() {
  const { data: schedules, refetch } = useGetAllSchedules();
  const [selectedSchedules, setSelectedSchedules] = useState<Schedule[]>([]);

  function handleExportSchedules() {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();

    const tableColumn = [
      'Status',
      'Solicitante',
      'Data',
      'Telefone',
      'Descrição',
    ];
    const tableRows: string[][] = [];

    selectedSchedules.forEach((schedule) => {
      const ticketData = [
        schedule.status,
        schedule.issue.requester,
        formatDate(schedule.dateTime),
        schedule.issue.phone,
        schedule.description,
      ];
      tableRows.push(ticketData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text('Lista de agendamentos', 14, 15);
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
              <Th>Solicitante</Th>
              <Th>Data</Th>
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
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
