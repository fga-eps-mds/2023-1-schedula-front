import {
  Button,
  HStack,
  Tooltip,
  Skeleton,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/all';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { ProblemTypeModal } from '@/features/problem/problem-types/components/problem-type-modal';
import { useDeleteProblemType } from '@/features/problem/problem-types/api/delete-problem-type';
import { ProblemType } from '@/features/problem/problem-types/types';
import { ProblemTypeItem } from '@/features/problem/problem-types/components/problem-type-item';
import { useGetProblemCategory } from '@/features/problem/api/get-problem-category';
import { ListView } from '@/components/list';
import { Permission } from '@/components/permission';

export function ListaProblemas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id: categoryId } = useParams();
  const navigate = useNavigate();
  const [problemTypeToEdit, setProblemTypeToEdit] = useState<ProblemType>();

  const {
    data: category,
    isLoading,
    refetch,
  } = useGetProblemCategory({ categoryId });

  const { mutate: deleteProblemType, isLoading: isDeletingProblemType } =
    useDeleteProblemType();

  const onEdit = useCallback(
    (problem: ProblemType) => {
      setProblemTypeToEdit(problem);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (id: string) => {
      deleteProblemType({ id });
    },
    [deleteProblemType]
  );

  const handleClose = useCallback(() => {
    setProblemTypeToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderProblemTypeItem = useCallback(
    (problemType: ProblemType) => (
      <ProblemTypeItem
        problemType={problemType}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isDeletingProblemType}
      />
    ),
    [onDelete, onEdit, isDeletingProblemType]
  );

  return (
    <>
      <PageHeader
        title="Gerenciar Tipos de Problema"
        subtitle={
          <Skeleton h="16px" isLoaded={Boolean(!isLoading && categoryId)}>
            <Text color="GrayText">
              Da Categoria{' '}
              <Tag colorScheme="yellow" fontWeight="semibold" fontSize="md">
                {category?.name}
              </Tag>
            </Text>
          </Skeleton>
        }
      >
        <HStack spacing={2}>
          <Tooltip
            label="Voltar para Tutoriais"
            placement="top"
            color="white"
            bg="gray"
          >
            <span>
              {' '}
              <IoArrowBackCircleOutline
                style={{ cursor: 'pointer' }}
                size={35}
                onClick={() => navigate('/categorias')}
              />
            </span>
          </Tooltip>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN', 'BASIC']}>
            <Button onClick={onOpen}>Novo Tipo de Problema</Button>
          </Permission>
        </HStack>
      </PageHeader>

      <ListView<ProblemType>
        items={category?.problem_types}
        render={renderProblemTypeItem}
        isLoading={isLoading}
      />

      <ProblemTypeModal
        isOpen={isOpen}
        onClose={handleClose}
        problemType={problemTypeToEdit}
        categoryId={categoryId ?? ''}
      />
    </>
  );
}
