import {
  Divider,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';

interface EventInfoProps {
  applicant_name: string;
  applicant_phone: string;
  city: string;
  workstation: string;
  category: string;
  problem: string;
}

export function EventInfo({
  applicant_name,
  applicant_phone,
  city,
  workstation,
  category,
  problem,
}: EventInfoProps) {
  return (
    <VStack align="stretch" spacing={2} divider={<Divider />}>
      <StatGroup>
        <Stat>
          <StatLabel fontWeight="normal">Solicitante</StatLabel>
          <StatNumber fontSize="md">{applicant_name || '---'}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontWeight="normal">Telefone</StatLabel>
          <StatNumber fontSize="md">{applicant_phone || '---'}</StatNumber>
        </Stat>
      </StatGroup>

      <StatGroup>
        <Stat>
          <StatLabel fontWeight="normal">Cidade</StatLabel>
          <StatNumber fontSize="md">{city || '---'}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontWeight="normal">Posto de Trabalho</StatLabel>
          <StatNumber fontSize="md">{workstation || '---'}</StatNumber>
        </Stat>
      </StatGroup>

      <StatGroup>
        <Stat>
          <StatLabel fontWeight="normal">Categoria de Problema</StatLabel>
          <StatNumber fontSize="md">{category || '---'}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontWeight="normal">Tipo de Problema</StatLabel>
          <StatNumber fontSize="md">{problem || '---'}</StatNumber>
        </Stat>
      </StatGroup>
    </VStack>
  );
}
