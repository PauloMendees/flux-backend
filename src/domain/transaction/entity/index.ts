import { Category } from "src/domain/category/entity";
import { Wallet } from "src/domain/wallet/entity";

export type TransactionType = "INCOMING" | "DEBIT";

export interface Transaction {
  id: string;
  title: string;
  description?: string;
  value: number;
  date: Date;
  type: TransactionType;
  categoryId?: string;
  category?: Category;
  walletId: string;
  wallet: Wallet;
  createdAt: Date;
  updatedAt: Date;
}
