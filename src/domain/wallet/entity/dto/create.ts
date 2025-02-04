export interface CreateWalletDto {
  name: string;
  description?: string;
  ownerId: string;
}

export interface CreateUserWalletDto {
  userProfileId: string;
  walletId: string;
  accepted?: boolean;
}
