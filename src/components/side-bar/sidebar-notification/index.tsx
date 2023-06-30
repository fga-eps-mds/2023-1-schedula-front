/* eslint-disable react/display-name */
import { memo } from 'react';
import { Box, LinkBox, HStack, Icon, Text, Badge } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { IRoute } from '@/constants/routes';
import { Permission } from '@/components/permission';
import { useGetAllNotification } from '@/features/notifications/api/get-all-notifications';

const hoverStyle = {
  border: '1px solid',
  borderColor: 'primary',
  textDecoration: 'none',
  backgroundPosition: 'right center',
};

export const SideBarNotification = memo(
  ({ label, pathname, icon, allowedUsersPath }: IRoute) => {
    const location = useLocation();
    const isActive = location.pathname === pathname;

    const { data: notifications } = useGetAllNotification();

    const user = JSON.parse(localStorage.getItem('@schedula:user') || '[]');

    const filteredNotifications = notifications?.filter((notification) => {
      return (
        notification.targetEmail === user.email && notification.read === false
      );
    });

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
              px={2}
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
              <Icon as={icon} boxSize="1.8em" />
              <Box flex="1" textAlign="center">
                <Text fontWeight="medium">{label}</Text>
              </Box>

              <Badge
                colorScheme="red"
                borderRadius="full"
                variant="solid"
                px={2}
                py={1}
                fontSize="xs"
                style={{
                  opacity:
                    filteredNotifications?.length === 0 ||
                    user.profile !== 'BASIC'
                      ? 0
                      : 1,
                }}
              >
                {filteredNotifications?.length}
              </Badge>
            </HStack>
          </LinkBox>
        </Link>
      </Permission>
    );
  }
);
