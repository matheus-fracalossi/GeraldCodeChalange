import { API_URL } from '@env';

import { Transaction, TransactionFilter } from "../types/transaction";

interface PaginationParams {
  page?: number;
  perPage?: number;
  sort?: string;
  type?: Transaction["type"];
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

  // Add 1 second delay to show skeleton loading state
  await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

const getPaginated = async <T>(
  endpoint: string, 
  { page = 1, perPage = 10, sort, type }: PaginationParams = {}
): Promise<PaginatedResponse<T>> => {
  const params: Record<string, string | number> = { 
    _page: page, 
    _per_page: perPage 
  };
  
  if (sort !== undefined) {
    params._sort = sort;
  }
  
  if (type !== undefined) {
    params.type = type;
  }
  
  const data = await get<PaginatedResponse<T>>(endpoint, params);
  
  return data;
};

export const httpClient = { get, getPaginated };
export type { PaginationParams, PaginatedResponse };
