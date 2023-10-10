import { TableResultDto } from './dtos/tableDto';

export const handleErrorMessage = (error: any) => {
  return error?.detail || error?.message || 'Internal server error';
};

export const randomString = () => {
  return btoa(Math.random().toString(36)).substring(2, 10);
};

export const generateTableDto = <T>(
  data: T[],
  totalItems: number,
  pageSize: number,
  currentPage: number,
): TableResultDto<T> => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 0;
  return {
    data,
    totalItems,
    currentPage,
    hasNext,
    hasPrev,
    pageSize,
    totalPages,
  };
};
