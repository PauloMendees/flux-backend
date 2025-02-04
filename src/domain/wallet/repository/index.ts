import { Wallet } from "../entity";
import { CreateWalletDto } from "../entity/dto/create";
import { UpdateWalletDto } from "../entity/dto/update";

export interface WalletRepository {
  create(dto: CreateWalletDto): Promise<Wallet>;
  update(dto: UpdateWalletDto): Promise<Wallet>;
  delete(walletId: string, ownerId: string): Promise<void>;
}
