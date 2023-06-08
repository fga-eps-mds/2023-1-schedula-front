import { Flex, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '@/components/side-bar-open';
import Footnote from '@/features/api-status/components/footnote';
import { AutoLogoutComponent } from '@/components/auto-logout-component';

export function DefaultLayoutOpen() {
  return (
    <AutoLogoutComponent>
      <Flex
        as="main"
        justifyContent="center"
        p={14}
        minHeight="100vh"
        overflow="clip"
      >
        <Grid
          width="100%"
          maxWidth="1440px"
          templateColumns="auto minmax(0, 1fr)"
          gap={14}
        >
          <SideBar />
          <Flex flexDirection="column">
            <Outlet />
          </Flex>
        </Grid>

        <Footnote />
      </Flex>
    </AutoLogoutComponent>
  );
}
