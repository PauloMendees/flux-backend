import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { DefaultFiltersDto } from "src/infra/constants/queryFilterSchema";
import { PrismaTransactionRepository } from "src/infra/database/prisma-repositories/transaction";
import { PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";
import { verifyIfUserIsInWallet } from "src/infra/utils/wallet/verifyIfUserIsInWallet";

export class ListTransactionsByWalletServiceDto extends DefaultFiltersDto {
  @ApiProperty({ type: "string" })
  walletId?: string;
}

@Injectable()
export class ListTransactionsByWalletService {
  constructor(
    private readonly transactionRepository: PrismaTransactionRepository,
    private readonly walletRepository: PrismaWalletRepository
  ) {}

  async execute(dto: ListTransactionsByWalletServiceDto, userProfileId: string) {
    await verifyIfUserIsInWallet({
      userProfileId,
      walletRepository: this.walletRepository,
      walletId: dto.walletId
    });

    return this.transactionRepository.list(dto);
  }
}
