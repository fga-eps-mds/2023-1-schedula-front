export interface GetReportParams {
  startDate: string | null;
  endDate: string | null;
}

export interface GetReportResponse {
  type: string,
  data: ArrayBuffer,
}