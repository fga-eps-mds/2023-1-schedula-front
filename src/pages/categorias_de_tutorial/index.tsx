import { useCallback, useState, useEffect } from 'react';
import {
  Button,
  HStack,
  useDisclosure,
  Input,
  Icon,
  Tooltip,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/all';
import { FaSearch } from 'react-icons/fa';
import { CategoryTutorialItem } from '@/features/categories-tutorial/components/category-tutorial-item';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { CategoryTutorialModal } from '@/features/categories-tutorial/components/category-tutorial-modal/category-tutorial-modal';
import { useGetAllCategoryTutorial } from '@/features/categories-tutorial/api/get-all-categories-tutorial';
import { useDeleteCategoryTutorial } from '@/features/categories-tutorial/api/delete-category-tutorial';
import { CategoryTutorial } from '@/features/categories-tutorial/api/types';
import { Permission } from '@/components/permission';

export function CategoriasTutorial() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [categoryTutorialToEdit, setCategoryTutorialToEdit] =
    useState<CategoryTutorial>();

  const [modalClosed, setModalClosed] = useState(false);
  const [aux, setAux] = useState(0);

  const {
    data: categoriesTutorial,
    isLoading,
    refetch,
  } = useGetAllCategoryTutorial(aux);

  const [filteredCategoriesTutorial, setFilteredCategoriesTutorial] = useState<
    CategoryTutorial[]
  >(categoriesTutorial || []);

  const {
    mutate: deleteCategoryTutorial,
    isLoading: isRemovingCategoryTutorial,
  } = useDeleteCategoryTutorial();

  const onEdit = useCallback(
    (categoryTutorial: CategoryTutorial) => {
      setCategoryTutorialToEdit(categoryTutorial);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (categoryTutorialId: string) => {
      deleteCategoryTutorial({ categoryTutorialId });
      refetch();
      setModalClosed((prevModalClosed) => !prevModalClosed);
    },
    [deleteCategoryTutorial, refetch]
  );

  const handleClose = useCallback(() => {
    setCategoryTutorialToEdit(undefined);
    onClose();
    setModalClosed((prevModalClosed) => !prevModalClosed);
  }, [onClose]);

  const renderCategoryTutorialItem = useCallback(
    (categoryTutorial: CategoryTutorial) => (
      <CategoryTutorialItem
        categoryTutorial={categoryTutorial}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isRemovingCategoryTutorial}
      />
    ),
    [onDelete, onEdit, isRemovingCategoryTutorial]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.toLowerCase();
      const filteredCategoriesTutorial = categoriesTutorial?.filter(
        (categoryTutorial) =>
          categoryTutorial.name.toLowerCase().includes(searchText)
      );
      setFilteredCategoriesTutorial(filteredCategoriesTutorial || []);
    },
    [categoriesTutorial]
  );

  useEffect(() => {
    const updatedCategoriesTutorial = categoriesTutorial || [];
    setFilteredCategoriesTutorial(updatedCategoriesTutorial);
  }, [categoriesTutorial]);

  useEffect(() => {
    let i = 0;
    setAux(i);
    const interval = setInterval(async () => {
      await refetch?.();
      if (i >= 3) {
        setAux(0);
        clearInterval(interval);
      }
      i += 1;
      setAux(i);
    }, 1000);
    return () => clearInterval(interval);
  }, [modalClosed, refetch]);

  return (
    <>
      <PageHeader title="Categorias de Tutoriais">
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
                onClick={() => navigate('/tutoriais')}
              />
            </span>
          </Tooltip>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN']}>
            <Button onClick={onOpen}>Criar categoria</Button>
          </Permission>
        </HStack>
      </PageHeader>

      <InputGroup marginBottom="4">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} boxSize={4} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Pesquisar Categorias"
          onChange={handleSearch}
          _placeholder={{ color: 'gray.400' }}
        />
      </InputGroup>

      <ListView<CategoryTutorial>
        items={filteredCategoriesTutorial}
        render={renderCategoryTutorialItem}
        isLoading={isLoading}
      />

      <CategoryTutorialModal
        isOpen={isOpen}
        onClose={handleClose}
        categoryTutorial={categoryTutorialToEdit}
      />
    </>
  );
}
