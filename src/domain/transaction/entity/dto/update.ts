import { TransactionType } from "..";

export interface UpdateTransactionDTO {
  id: string;
  title: string;
  description?: string;
  value: number;
  date: Date;
  categoryId?: string;
  walletId: string;
  type: TransactionType;
}
