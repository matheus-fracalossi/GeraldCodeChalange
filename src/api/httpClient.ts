import { API_URL } from '@env';

export enum ApiEndpoints {
  TRANSACTIONS = '/transactions',
  TRANSACTIONS_SEARCH = '/transactions/search',
}

interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

const makeRequest = async <T>(
  endpoint: ApiEndpoints,
  method: 'GET' = 'GET',
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  const { headers = {} } = config;
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  return {
    data,
    status: response.status,
    statusText: response.statusText,
  };
};

const get = <T>(endpoint: ApiEndpoints, config?: RequestConfig): Promise<ApiResponse<T>> =>
  makeRequest<T>(endpoint, 'GET', config);

export const httpClient = { get };
export default httpClient;
