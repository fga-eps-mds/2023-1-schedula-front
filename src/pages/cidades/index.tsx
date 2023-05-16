import { useCallback, useState, useEffect } from 'react';
import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { CityItem } from '@/features/cities/components/city-item';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { CityModal } from '@/features/cities/components/city-modal/city-modal';
import { useGetAllCities } from '@/features/cities/api/get-all-cities';
import { useDeleteCity } from '@/features/cities/api/delete-city';
import { City } from '@/features/cities/api/types';
import { Permission } from '@/components/permission';

export function Cities() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cityToEdit, setCityToEdit] = useState<City>();
  const [modalClosed, setModalClosed] = useState(false); // Novo estado para controlar o fechamento da modal

  const { data: cities, isLoading, refetch } = useGetAllCities();
  const { mutate: deleteCity, isLoading: isRemovingCity } = useDeleteCity();

  const onEdit = useCallback(
    (city: City) => {
      setCityToEdit(city);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (cityId: string) => {
      deleteCity({ cityId });
      setModalClosed(true);
    },
    [deleteCity]
  );

  const handleClose = useCallback(() => {
    setCityToEdit(undefined);
    onClose();
    setModalClosed(true);
  }, [onClose]);

  const renderCityItem = useCallback(
    (city: City) => (
      <CityItem
        city={city}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isRemovingCity}
      />
    ),
    [onDelete, onEdit, isRemovingCity]
  );
  useEffect(() => {
    if (modalClosed) {
      const timeout = setTimeout(() => {
        refetch?.().finally(() => setModalClosed(false));
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [modalClosed, refetch]);

  return (
    <>
      <PageHeader title="Cidades Cadastradas">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Permission allowedRoles={['ADMIN']}>
            <Button onClick={onOpen}>Nova Cidade</Button>
          </Permission>
        </HStack>
      </PageHeader>

      <ListView<City>
        items={cities}
        render={renderCityItem}
        isLoading={isLoading}
      />

      <CityModal isOpen={isOpen} onClose={handleClose} city={cityToEdit} />
    </>
  );
}
