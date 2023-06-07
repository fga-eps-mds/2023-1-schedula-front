/* eslint-disable react/display-name */
import { memo } from 'react';
import { LinkBox, HStack, Icon, Text } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { IRoute } from '@/constants/routes';
import { Permission } from '@/components/permission';

const hoverStyle = {
  border: '1px solid',
  borderColor: 'primary',
  textDecoration: 'none',
  backgroundPosition: 'right center',
};

export const SideBarItem = memo(
  ({ label, pathname, icon, allowedUsersPath }: IRoute) => {
    const location = useLocation();
    const isActive = location.pathname === pathname;

    return (
      <Permission allowedRoles={allowedUsersPath}>
        <Link to={pathname}>
          <LinkBox>
            <HStack
              transition="all 0.5s, color 0s"
              backgroundSize="200% auto"
              alignItems="center"
              gap={1}
              cursor="pointer"
              px={3}
              py={2.5}
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="base"
              bgImage={
                isActive
                  ? 'linear-gradient(to right, #FF8008 0%, #FFA03A 51%, #FF8008 100%)'
                  : 'transparent'
              }
              color={isActive ? 'white' : 'inherit'}
              boxShadow={isActive ? 'soft' : 'none'}
              _hover={hoverStyle}
            >
              <Icon as={icon} boxSize="1.5em" />

              <Text fontWeight="medium">{label}</Text>
            </HStack>
          </LinkBox>
        </Link>
      </Permission>
    );
  }
);
