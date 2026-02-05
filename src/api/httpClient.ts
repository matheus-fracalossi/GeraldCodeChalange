import { API_URL } from '@env';

import { Transaction, TransactionFilter } from "../types/transaction";

interface PaginationParams {
  page?: number;
  perPage?: number;
  sort?: string;
  type?: Transaction["type"];
  merchant?: Transaction["merchant"];
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

const getPaginatedWithHeaders = async <T>(
  endpoint: string, 
  params?: Record<string, string | number>
): Promise<{ data: T[], headers: Headers }> => {
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

  const data = await response.json();
  return { data, headers: response.headers };
};

const getPaginated = async <T>(
  endpoint: string, 
  { page = 1, perPage = 10, sort, type, merchant }: PaginationParams = {}
): Promise<PaginatedResponse<T>> => {
  const params: Record<string, string | number> = { 
    _page: page, 
    _per_page: perPage,
  };
  
  if (sort !== undefined) {
    params._sort = sort;
  }
  
  if (type !== undefined) {
    params.type = type;
  }
  
  if (merchant !== undefined) {
    params.merchant_like = merchant;
  }
  
  const { data, headers } = await getPaginatedWithHeaders<T>(endpoint, params);
  
  // Parse pagination info from headers (json-server v0.17.4 format)
  const totalCount = parseInt(headers.get('X-Total-Count') || '0');
  const totalPages = Math.ceil(totalCount / perPage);
  
  return {
    data,
    first: 1,
    prev: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
    last: totalPages,
    pages: totalPages,
    items: totalCount
  };
};

export const httpClient = { get, getPaginated };
export type { PaginationParams, PaginatedResponse };
