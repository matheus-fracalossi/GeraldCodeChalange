import { Transaction } from "../types/transaction";
import {
  httpClient,
  PaginationParams,
  PaginatedResponse,
} from "../api/httpClient";

export const getTransactionsPaginated = async (
  params?: PaginationParams,
): Promise<PaginatedResponse<Transaction>> => {
  return httpClient.getPaginated<Transaction>("/transactions", params);
};
