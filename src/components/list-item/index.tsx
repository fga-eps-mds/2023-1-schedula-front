import { ReactElement } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { ActionsProps } from '@/components/list-item/list-item-actions';

export interface ItemProps<Data> {
  title: string | JSX.Element;
  description?: string | JSX.Element;
  children?: ReactElement<ActionsProps<Data>> | JSX.Element | JSX.Element[];
}

export const customDivider = {
  content: "''",
  position: 'absolute',
  bottom: '0',
  width: '300px',
  height: '1px',
  backgroundColor: '#e6e6e6',
};

export function Item<Data>({ title, description, children }: ItemProps<Data>) {
  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      position="relative"
      bg="white"
      borderRadius="md"
      padding={5}
      boxShadow="lg"
    >
      <Box alignSelf="center">
        <Box
          fontWeight="medium"
          mb={1}
          position="relative"
          _before={customDivider}
        >
          {title}
        </Box>
        <Box color="GrayText">{description}</Box>
      </Box>

      <Box alignSelf="end" display="contents">
        {children}
      </Box>
    </Flex>
  );
}
