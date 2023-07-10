import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { REPORT_ENDPOINT } from '@/features/reports/constants/requests';
import { GetReportParams, GetReportResponse } from '@/features/reports/types';
import { toast } from '@/utils/toast';
import { REPORT_CACHE_KEYS } from '@/features/reports/constants/cache';

const getReport = async ({ startDate, endDate }: GetReportParams) =>
  api
    .get<GetReportResponse>(
      `${REPORT_ENDPOINT}/report/?startDate=${startDate}&endDate=${endDate}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(
        'Não foi possível carregar o relatório. Tente novamente mais tarde!'
      );
      return error;
    });

// Set this with mutation
export const useGetReport = ({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation(getReport, {
    onSuccess() {
      queryClient.invalidateQueries([REPORT_CACHE_KEYS.reportsCache]);

      onSuccessCallBack?.();
    },
  });
};
