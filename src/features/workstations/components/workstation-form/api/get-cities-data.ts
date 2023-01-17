import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';

function getCitiesData() {
  return (
    api
      .get('colocarendpoint')
      .then((response) => response.data)
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err))
  );
}

export function useGetCitiesData() {
  return useQuery(['get-cities-data'], getCitiesData);
}
