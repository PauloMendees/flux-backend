import { UserWallet, Wallet } from "../entity";
import { CreateUserWalletDto, CreateWalletDto } from "../entity/dto/create";
import { UpdateWalletDto } from "../entity/dto/update";

export interface WalletRepository {
  create(dto: CreateWalletDto): Promise<Wallet>;
  update(dto: UpdateWalletDto): Promise<Wallet>;
  delete(walletId: string, ownerId: string): Promise<void>;
}

export interface UserWalletRepository {
  create(dto: CreateUserWalletDto): Promise<UserWallet>;
  delete(walletId: string, userId: string): Promise<void>;
  list(userId: string): Promise<UserWallet[]>;
}
