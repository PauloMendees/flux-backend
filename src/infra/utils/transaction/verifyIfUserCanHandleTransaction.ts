import { UnauthorizedException } from "@nestjs/common";
import { TransactionRepository } from "src/domain/transaction/repository";

type VerifyIfUserCanHandleTransactionParams = {
  transactionRepository: TransactionRepository;
  transactionId: string;
  userProfileId: string;
};

export const verifyIfUserCanHandleTransaction = async ({
  transactionRepository,
  transactionId,
  userProfileId
}: VerifyIfUserCanHandleTransactionParams) => {
  const transaction = await transactionRepository.getById(transactionId);
  const userIdsInsideWallet = transaction.wallet.userWallets.map(userWallet => userWallet.userProfileId);

  if (!userIdsInsideWallet.includes(userProfileId)) {
    throw new UnauthorizedException("User is not in this wallet");
  }
};
