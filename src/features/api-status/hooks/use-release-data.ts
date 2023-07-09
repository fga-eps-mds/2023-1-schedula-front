import { useMemo } from 'react';
import { useGetLocationsServiceReleaseVersion } from '@/features/api-status/api/get-location-release-version';
import { useGetScheduleServiceReleaseVersion } from '@/features/api-status/api/get-schedule-release-version';
import { useGetUsersServiceReleaseVersion } from '@/features/api-status/api/get-users-release-version';
import { useGetTutorialsServiceReleaseVersion } from '@/features/api-status/api/get-tutorial-release-version';
import { useGetAlertsServiceReleaseVersion } from '@/features/api-status/api/get-alert-release-version';

type Releases = {
  tag_name: string;
  name: string;
};

export const useReleaseData = () => {
  const { data: locationsVersion, isLoading: isLoadingLocationsVersion } =
    useGetLocationsServiceReleaseVersion();
  const { data: schedulesVersion, isLoading: isLoadingSchedulesVersion } =
    useGetScheduleServiceReleaseVersion();
  const { data: usersVersion, isLoading: isLoadingUsersVersion } =
    useGetUsersServiceReleaseVersion();
  const { data: tutorialsVersion, isLoading: isLoadingTutorialsVersion } =
    useGetTutorialsServiceReleaseVersion();
  const { data: alertsVersion, isLoading: isLoadingAlertsVersion } =
    useGetAlertsServiceReleaseVersion();

  const apiVersions = useMemo(
    () => ({
      usuarios: (usersVersion as unknown as Releases[])?.[0]?.tag_name,
      chamados: (schedulesVersion as unknown as Releases[])?.[0]?.tag_name,
      localidades: (locationsVersion as unknown as Releases[])?.[0]?.tag_name,
      tutoriais: (tutorialsVersion as unknown as Releases[])?.[0]?.tag_name,
      alertas: (alertsVersion as unknown as Releases[])?.[0]?.tag_name,
    }),
    [
      schedulesVersion,
      locationsVersion,
      usersVersion,
      tutorialsVersion,
      alertsVersion,
    ]
  );

  return {
    isLoadingUserVersion: isLoadingUsersVersion,
    isLoadingChamadosVersion: isLoadingSchedulesVersion,
    isLoadingLocalidadesVersion: isLoadingLocationsVersion,
    isLoadingTutoriaisVersion: isLoadingTutorialsVersion,
    isLoadingAlertasVersion: isLoadingAlertsVersion,
    apiVersions,
  };
};
