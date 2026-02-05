import { API_URL } from '@env';

interface PaginationParams {
  page?: number;
  perPage?: number;
  sort?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
}

const get = async <T>(endpoint: string, params?: Record<string, string | number>): Promise<T> => {
  let url = `${API_URL}${endpoint}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

const getPaginated = async <T>(
  endpoint: string, 
  { page = 1, perPage = 10, sort }: PaginationParams = {}
): Promise<PaginatedResponse<T>> => {
  const params: Record<string, string | number> = { _page: page, _per_page: perPage };
  
  if (sort) {
    params._sort = sort;
  }
  
  const data = await get<PaginatedResponse<T>>(endpoint, params);
  
  return data;
};

export const httpClient = { get, getPaginated };
export type { PaginationParams, PaginatedResponse };
