import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Center, Input, Text } from '@chakra-ui/react';
import { CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function Login() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialUser>();

  const onSubmit: SubmitHandler<CredentialUser> = async ({
    username,
    password,
  }) => {
    setIsLoading(true);
    await signIn({ username, password });
    setIsLoading(false);
  };

  return (
    <Center
      aria-label="form"
      bgGradient="linear(288.94deg, #F8B86D 0%, #F49320 90.96%)"
      h="100vh"
      color="white"
    >
      <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
        <Box
          bg="white"
          borderRadius="10px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
          color="black"
          paddingY="20"
          paddingX="20"
        >
          <Text mb="39px" color="#605555" fontWeight="semibold" fontSize="4xl">
            Bem-vindo
          </Text>
          <Box marginBottom={10}>
            <Text
              pl="5px"
              pb="8px"
              color="#605555"
              fontWeight="medium"
              fontSize="lg"
            >
              Login
            </Text>
            <Input
              size="lg"
              fontSize="lg"
              {...register('username', { required: true })}
              placeholder="Nome de usuário"
            />
            {errors.username && (
              <span>
                <Text color="red.400">Este campo é obrigatório</Text>
              </span>
            )}
          </Box>
          <Box mb="70px">
            {' '}
            <Text
              pl="5px"
              pb="8px"
              color="#605555"
              fontWeight="medium"
              fontSize="lg"
            >
              {' '}
              Senha{' '}
            </Text>
            <Input
              size="lg"
              fontSize="lg"
              {...register('password', { required: true })}
              type="password"
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <span>
                <Text color="red.400">Este campo é obrigatório</Text>
              </span>
            )}
          </Box>
          <Center>
            <Button
              mb="70px"
              type="submit"
              paddingX="24"
              width="sm"
              isLoading={isLoading}
            >
              ENTRAR
            </Button>
          </Center>
        </Box>
        <CalendarClock
          style={{ marginLeft: '245px', marginTop: '20px' }}
          fontSize={18}
          size={70}
        />
        <Center>
          <Button
            onClick={() => navigate('../agendamentos_abertos')}
            sx={{
              bgImage:
                'linear-gradient(to right, #fa781b 0%, #FF8C00 51%, #FFA03A 100%)',
              _hover: {
                bgImage:
                  'linear-gradient(to right, #fa781b 0%, #fa652f 51%, #FFA03A 100%)',
                backgroundPosition: 'right center',
                transition: '0.5s',
              },
            }}
            mt="10px"
            mb="70px"
            type="submit"
            paddingX="24"
            width="sm"
            isLoading={isLoading}
          >
            Agendamentos
          </Button>
        </Center>
      </form>
    </Center>
  );
}
