import { FaSearch } from 'react-icons/fa';
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { PageHeader } from '@/components/page-header';

export function NotificacaoUsuario() {
  return (
    <>
      <PageHeader title="Notificações" />

      <Grid>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} boxSize={4} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Pesquisar notificações"
            _placeholder={{ color: 'gray.400' }}
          />
        </InputGroup>
      </Grid>
    </>
  );
}
