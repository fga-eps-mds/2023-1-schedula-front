import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { CategoriaForm } from '@/components/forms/categoria-form';

interface CategoryModalProps extends Partial<ModalProps> {
  category?: Category | undefined;
  onSubmit: (result: Result<ApiResponse<Category>>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryModal({
  onClose,
  category,
  onSubmit,
  ...props
}: CategoryModalProps) {
  const handleSubmit = useCallback(async (data: CategoryPayload) => {
    console.log('DATA: ', data);

    // const response = await request<Category>(
    //   category ? updateCategory(category.id)(data) : createCategory(data)
    // );

    // onSubmit?.(response);

    // if (response.type === 'error') {
    //   // Let hook form know that submit was not successful
    //   return Promise.reject(response.error?.message);
    // }
    // onClose?.();
  }, []);

  return (
    <Modal
      title={`${category ? 'Editar' : 'Nova'} Categoria`}
      onClose={onClose}
      {...props}
    >
      <CategoriaForm defaultValues={category} onSubmit={handleSubmit} />
    </Modal>
  );
}
