import { DefaultQueryFilter } from "src/infra/constants/queryFilterSchema";
import { Transaction } from "../entity";
import { CreateTransactionDTO } from "../entity/dto/create";
import { UpdateTransactionDTO } from "../entity/dto/update";

export type ListTransactionFilter = DefaultQueryFilter & {
  walletId: string;
};

export interface TransactionRepository {
  create(dto: CreateTransactionDTO): Promise<Transaction>;
  update(dto: UpdateTransactionDTO): Promise<Transaction>;
  remove(id: string): Promise<void>;
  getById(id: string): Promise<Transaction>;
  list(filters: ListTransactionFilter): Promise<Transaction[]>;
  count(filters: Omit<ListTransactionFilter, "page" | "pageSize">): Promise<number>;
}
