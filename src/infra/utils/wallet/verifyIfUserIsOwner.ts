import { UnauthorizedException } from "@nestjs/common";
import { WalletRepository } from "src/domain/wallet/repository";

type VerifyIfUserIsWalletOwnerParams = {
  walletId: string;
  userProfileId: string;
  walletRepository: WalletRepository;
};

export const verifyIfUserIsWalletOwner = async ({
  walletRepository,
  walletId,
  userProfileId
}: VerifyIfUserIsWalletOwnerParams) => {
  const wallet = await walletRepository.getById(walletId);

  if (wallet.ownerId !== userProfileId) {
    throw new UnauthorizedException("Usuário não é dono dessa carteira");
  }
};
