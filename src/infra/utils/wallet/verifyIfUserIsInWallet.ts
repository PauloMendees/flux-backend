import { UnauthorizedException } from "@nestjs/common";
import { WalletRepository } from "src/domain/wallet/repository";

type VerifyIfUserIsInWalletParams = {
  walletId: string;
  userProfileId: string;
  walletRepository: WalletRepository;
};

export const verifyIfUserIsInWallet = async ({
  walletRepository,
  walletId,
  userProfileId
}: VerifyIfUserIsInWalletParams) => {
  const wallet = await walletRepository.getById(walletId);
  const userWallets = wallet.userWallets.map(userWallet => userWallet.userProfileId);
  if (!userWallets.includes(userProfileId)) {
    throw new UnauthorizedException("Usuário não faz parte dessa carteira");
  }
};
