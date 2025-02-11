import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "src/domain/transaction/entity";
import { PrismaTransactionRepository } from "src/infra/database/prisma-repositories/transaction";
import { PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";
import { verifyIfUserIsInWallet } from "src/infra/utils/wallet/verifyIfUserIsInWallet";

export class CreateTransactionServiceDTO {
  @ApiProperty({ type: "string" })
  title: string;
  @ApiProperty({ type: "string", required: false })
  description?: string;
  @ApiProperty({ type: "number" })
  value: number;
  @ApiProperty({ type: "string" })
  date: Date;
  @ApiProperty({ type: "string", required: false })
  categoryId?: string;
  @ApiProperty({ type: "string" })
  walletId: string;
  @ApiProperty({ type: "string" })
  type: TransactionType;
}

@Injectable()
export class CreateTransactionService {
  constructor(
    private readonly transactionRepository: PrismaTransactionRepository,
    private readonly walletRepository: PrismaWalletRepository
  ) {}

  async execute(dto: CreateTransactionServiceDTO, userProfileId: string) {
    await verifyIfUserIsInWallet({
      userProfileId,
      walletRepository: this.walletRepository,
      walletId: dto.walletId
    });

    const transaction = await this.transactionRepository.create({
      ...dto
    });

    return transaction;
  }
}
