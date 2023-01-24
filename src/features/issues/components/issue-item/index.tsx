import { ReactElement, useMemo } from 'react';
import {
  Badge,
  Box,
  HStack,
  Skeleton,
  Spacer,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { priorityColorMap } from '@/utils/priority';
import { CHAMADO_PRIORITY } from '@/constants/chamados';
import { formatDate } from '@/utils/format-date';

interface ChamadoItemProps {
  chamado: Chamado;
  handleEdit: (chamado: Chamado) => void;
}

export function ChamadoItem({ chamado, handleEdit }: ChamadoItemProps) {
  const isEditAuthorized = true;
  // const { isAuthorized: isEditAuthorized } = useAuthorization(["manager"])

  const isEvent = useMemo(
    () => chamado?.problems?.some((item) => item?.is_event),
    [chamado?.problems]
  );

  // const { data: city, isLoading: isLoadingCity } = useRequest<City>(
  //   getCityById(chamado?.city_id),
  //   {
  //     revalidateIfStale: false,
  //   }
  // );

  // const { data: workstation, isLoading: isLoadingWorkstation } =
  //   useRequest<Workstation>(getWorkstationById(chamado?.workstation_id), {
  //     revalidateIfStale: false,
  //   });

  return (
    // <Box>
    //   <HStack spacing={2}>
    //     {chamado.problems.map((problem, index) => (
    //       <Badge
    //         colorScheme={priorityColorMap(problem.priority)}
    //         variant={
    //           {
    //             low: 'outline',
    //             normal: 'outline',
    //             high: 'subtle',
    //             urgent: 'solid',
    //           }[problem.priority]
    //         }
    //         key={index}
    //       >
    //         {CHAMADO_PRIORITY[problem.priority]}
    //       </Badge>
    //     ))}
    //     <Spacer />
    //     {isEvent && (
    //       <Text>
    //         Agendado para {formatDate(new Date())} as{' '}
    //         {formatDate(new Date(), 'time')}
    //       </Text>
    //     )}
    //   </HStack>
    //   <Item<Chamado>
    //     title={
    //       <HStack spacing={6}>
    //         <Box>
    //           <Text fontSize="sm" fontWeight="light" color="GrayText">
    //             Posto de Trabalho
    //           </Text>
    //           <Skeleton isLoaded={!isLoadingWorkstation}>
    //             <Text noOfLines={1}>{workstation?.data?.name}</Text>
    //           </Skeleton>
    //         </Box>
    //         <Box>
    //           <Text fontSize="sm" fontWeight="light" color="GrayText">
    //             Local
    //           </Text>
    //           <Skeleton isLoaded={!isLoadingCity}>
    //             <Text noOfLines={1}>{city?.data?.name}</Text>
    //           </Skeleton>
    //         </Box>
    //         <Box>
    //           <Text fontSize="sm" fontWeight="light" color="GrayText">
    //             Solicitante
    //           </Text>
    //           <Text noOfLines={1}>{chamado?.applicant_name}</Text>
    //         </Box>
    //         <Box>
    //           <Text fontSize="sm" fontWeight="light" color="GrayText">
    //             Telefone
    //           </Text>

    //           <Text noOfLines={1}>{workstation?.data?.phones?.[0]}</Text>
    //         </Box>
    //       </HStack>
    //     }
    //     description={
    //       <VStack align="stretch" spacing={2}>
    //         <HStack gap={4} mt={2} flexWrap="wrap">
    //           {chamado?.problems.map((problem) => (
    //             <HStack align="start" spacing={1} key={problem?.problem_id}>
    //               <Tag variant="subtle" colorScheme="gray">
    //                 {problem?.category?.name}
    //               </Tag>
    //               <Tag variant="subtle" colorScheme="purple">
    //                 {problem?.problem?.name}
    //               </Tag>
    //             </HStack>
    //           ))}
    //         </HStack>

    //         {isEvent && (
    //           <Box>
    //             <Text fontSize="sm" fontWeight="light" color="GrayText">
    //               Descrição
    //             </Text>
    //             <Text fontWeight="medium" color="black" noOfLines={2}>
    //               {chamado?.problems?.[0]?.description || '---'}
    //             </Text>
    //           </Box>
    //         )}
    //       </VStack>
    //     }
    //   >
    //     <VStack>
    //       <HStack
    //         alignItems="start"
    //         spacing={6}
    //         height="100%"
    //         textAlign="right"
    //       >
    //         <Box>
    //           <Text fontSize="sm" fontWeight="light" color="GrayText">
    //             Atendente
    //           </Text>
    //           <Text noOfLines={1}>{chamado?.attendant_name}</Text>
    //         </Box>
    //         <Box>
    //           <Text fontSize="sm" fontWeight="light" color="GrayText">
    //             Data / Hora
    //           </Text>
    //           <Box textAlign="center" fontWeight="medium">
    //             <Text>
    //               {formatDate(chamado?.created_at, 'date')}{' '}
    //               {formatDate(chamado?.created_at, 'time')}
    //             </Text>
    //           </Box>
    //         </Box>
    //       </HStack>

    //       <Item.Actions item={chamado}>
    //         {
    //           (isEditAuthorized && (
    //             <EditButton
    //               onClick={handleEdit}
    //               label={isEvent ? 'Evento' : 'Chamado'}
    //             />
    //           )) as ReactElement
    //         }
    //       </Item.Actions>
    //     </VStack>
    //   </Item>
    // </Box>
    <p>CORRIGIR</p>
  );
}
