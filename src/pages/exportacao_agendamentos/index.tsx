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
    const doc = new jsPDF('landscape');

    const tableColumn = [
      'Data',
      'Posto de Trabalho',
      'Status',
      'Solicitante',
      'Telefone do Posto',
      'Telefone do Solicitante',
      'Descrição',
    ];
    const tableRows: string[][] = [];

    selectedSchedules.forEach((schedule) => {
      const workstation = workstations?.find((workstation) => {
        return workstation?.id === schedule?.issue.workstation_id;
      });
      const ticketData: string[] | any = [
        formatDate(schedule.dateTime),
        `${workstation?.name} - ${workstation?.city.name}`,
        schedule.status,
        schedule.issue.requester,
        workstation?.phone,
        schedule.issue.phone,
        schedule.description,
      ];
      tableRows.push(ticketData);
    });

    /* Cria a tabela e altera as margens do documento */
    (doc as any).autoTable(tableColumn, tableRows, {
      startY: 20,
      margin: 10,
      columnStyles: {
        1: { cellWidth: 40 }, // Define o tamanho das colunas
        2: { cellWidth: 30 },
        3: { cellWidth: 40 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { minCellWidth: 40 },
      },
    });

    doc.text('Lista de agendamentos', 10, 15);
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
              <Th>Data</Th>
              <Th>Posto de Trabalho</Th>
              <Th>Status</Th>
              <Th>Solicitante</Th>
              <Th>Telefone do Posto</Th>
              <Th>Telefone do Solicitante</Th>
              <Th>Descrição</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(schedules)
              ? schedules?.map((schedule) => (
                  <ScheduleTableItem
                    key={schedule.id}
                    schedule={schedule}
                    selectedSchedules={selectedSchedules}
                    setSelectedSchedules={setSelectedSchedules}
                    workstation={workstations?.find((workstation) => {
                      return workstation?.id === schedule?.issue.workstation_id;
                    })}
                  />
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
