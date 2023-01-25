import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { ProblemCategory } from '@/features/problem-categories/api/types';
import { useGetAllProblemCategories } from '@/features/problem-categories/api/get-all-problem-category';
import { useDeleteProblemCategory } from '@/features/problem-categories/api/delete-problem-category';
import { CategoryItem } from '@/features/problem-categories/components/category-item';
import { ListView } from '@/components/list';
import { CategoryModal } from '@/features/problem-categories/components/category-modal/category-modal';

function ProblemCategories() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const isCreateAuthorized = true;
  const [problemcategoryToEdit, setProblemCategoryToEdit] =
    useState<Category>();

  const { data: categories, isLoading, refetch } = useGetAllProblemCategories();

  const {
    mutate: deleteProblemCategory,
    isLoading: isRemovingProblemCategory,
  } = useDeleteProblemCategory();

  const onEdit = useCallback(
    (category: Category) => {
      setProblemCategoryToEdit(category);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (id: string) => {
      deleteProblemCategory({ id });
    },
    [deleteProblemCategory]
  );

  const handleClose = useCallback(() => {
    setProblemCategoryToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderProblemCategoryItem = useCallback(
    (category: ProblemCategory) => (
      <CategoryItem
        category={category}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isRemovingProblemCategory}
      />
    ),
    [onDelete, onEdit, isRemovingProblemCategory]
  );

  return (
    <>
      <PageHeader title="Categorias de problema Cadastradas">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Button onClick={onOpen}>Nova Categoria</Button>
        </HStack>
      </PageHeader>

      <ListView<ProblemCategory>
        items={categories}
        render={renderProblemCategoryItem}
        isLoading={isLoading}
      />

      {/* <CategoryModal
        isOpen={isOpen}
        onClose={handleClose}
        problemcategory={problemcategoryToEdit}
      /> */}
    </>
  );
}

export default ProblemCategories;

// export function ListaCategoria() {
// const isCreateAuthorized = true
// const {
//   data: categorias,
//   isLoading,
//   isValidating,
//   mutate
// } = useRequest<Category[]>(getCategories())
// const { isOpen, onOpen, onClose } = useDisclosure()
// const [categoriaToEdit, setCategoriaToEdit] = useState<Category>()
// const refreshCategories = useCallback(
//   (data?: Category[]) =>
//     mutate(
//       {
//         data: {
//           error: null,
//           message: "",
//           data: data ?? []
//         }
//       } as AxiosResponse<ApiResponse<Category[]>>,
//       { revalidate: !data }
//     ),
//   [mutate]
// )
// const onDelete = useCallback(
//   (result: Result<ApiResponse<null>>, { id }: Category) => {
//     if (result.type === "success") {
//       toast.success(result.value?.message)
//       const newCategorias = categorias?.data.filter(
//         (categoria) => categoria.id !== id
//       )
//       refreshCategories(newCategorias)
//       return
//     }
//     toast.error(result.error?.message)
//   },
//   [categorias?.data, refreshCategories]
// )
// const onSubmit = useCallback(
//   (result: Result<ApiResponse<Category>>) => {
//     if (result.type === "error") {
//       toast.error(result.error?.message)
//       return
//     }
//     toast.success(result.value?.message)
//     const newCategorias = categoriaToEdit
//       ? categorias?.data.map((categoria) =>
//           categoria.id === categoriaToEdit?.id
//             ? result.value?.data
//             : categoria
//         )
//       : [...(categorias?.data || []), result.value?.data]
//     refreshCategories(newCategorias)
//     setCategoriaToEdit(undefined)
//     onClose()
//   },
//   [categoriaToEdit, categorias?.data, onClose, refreshCategories]
// )
// const onEdit = useCallback(
//   (categoria: Category) => {
//     setCategoriaToEdit(categoria)
//     onOpen()
//   },
//   [onOpen]
// )
// const handleClose = useCallback(() => {
//   setCategoriaToEdit(undefined)
//   onClose()
// }, [onClose])
// const renderCategoriaItem = useCallback(
//   (category: Category) => (
//     <CategoryItem category={category} onEdit={onEdit} onDelete={onDelete} />
//   ),
//   [onDelete, onEdit]
// )
/* return (
    <>
      <PageHeader title="Categorias de Problemas">
        <HStack spacing={2}>
          <RefreshButton
            refresh={() =>
              new Promise((resolve) => {
                resolve(5);
              })
            }
          />
          <Button onClick={() => console.log('Nova Categoria')}>
            Nova Categoria
          </Button>
        </HStack>
      </PageHeader>

      <p>Em progresso! Será entregue nas próximas interações..</p>

      {/* <ListView<Category>
        items={categorias?.data}
        render={renderCategoriaItem}
        isLoading={isLoading || isValidating}
      />

      <CategoryModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={onSubmit}
        category={categoriaToEdit}
      /> */
// }
// </>
// );
// } */

// export default ListaCategoria;
