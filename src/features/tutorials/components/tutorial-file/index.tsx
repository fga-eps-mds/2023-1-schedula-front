import {
  AspectRatio,
  Box,
  Container,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GrDocumentPdf } from 'react-icons/gr';

export function InputFile() {
  return (
    <Container my="12">
      <AspectRatio height="130" width="30" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                <Box height="20" width="16" position="relative" />
                <Stack p="8" textAlign="center" spacing="1">
                  <Text fontWeight="light">Adicione um arquivo</Text>
                  <GrDocumentPdf
                    size="40"
                    style={{
                      alignContent: 'center',
                      marginLeft: '50px',
                      filter: 'invert(0.6)',
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept=".pdf"
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}
