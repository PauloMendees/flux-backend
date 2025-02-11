import { TransactionType } from "..";

export interface CreateTransactionDTO {
  title: string;
  description?: string;
  value: number;
  date: Date;
  categoryId?: string;
  walletId: string;
  type: TransactionType;
}
