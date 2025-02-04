import { UserProfile } from "src/domain/userProfile/entity";

export interface Wallet {
  id?: string;
  name: string;
  description: string;
  deleted?: boolean;
  ownerId: string;
  userWallets?: UserWallet[];
  owner?: UserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWallet {
  id?: string;
  deleted?: boolean;
  userProfileId?: string;
  walletId?: string;
  user?: UserProfile;
  accepted: boolean;
  wallet?: Wallet;
  createdAt?: Date;
  updatedAt?: Date;
}
