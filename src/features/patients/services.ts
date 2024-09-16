import { ApiResponse, type BaseResponse } from '@/lib/api-response';
import { ApiRoutes } from '@/utils/api-routes';
import { type GetPatientsPaginatedResult } from './types';

export const getPaginatedPatients = async (
  currentPage: number,
  search?: string,
): Promise<BaseResponse<GetPatientsPaginatedResult>> => {
  const searchParams = new URLSearchParams({
    page: String(currentPage),
  });

  if (search) searchParams.append('search', search);

  const url = `${ApiRoutes.PATIENTS}?${searchParams.toString()}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()) as GetPatientsPaginatedResult;

  return new ApiResponse({
    data,
    status: response.status,
    success: response.ok,
  }).getResponse();
};
