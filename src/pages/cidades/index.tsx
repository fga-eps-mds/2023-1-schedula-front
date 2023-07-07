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
  const [modalClosed, setModalClosed] = useState(false);

  const [aux, setAux] = useState(0);
  const { data: cities, isLoading, refetch } = useGetAllCities(aux);
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
      setModalClosed((prevModalClosed) => !prevModalClosed);
    },
    [deleteCity]
  );

  const handleClose = useCallback(() => {
    setCityToEdit(undefined);
    onClose();
    setModalClosed((prevModalClosed) => !prevModalClosed);
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
    let i = 0;
    setAux(i);
    const interval = setInterval(() => {
      const fetchData = async () => {
        await refetch?.();
        if (i >= 3) {
          setAux(0);
          clearInterval(interval);
        }
        i += 1;
        setAux(i);
      };

      fetchData();
    }, 1000);
    return () => clearInterval(interval);
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
