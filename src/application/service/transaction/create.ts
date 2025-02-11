import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "src/domain/transaction/entity";
import { PrismaTransactionRepository } from "src/infra/database/prisma-repositories/transaction";
import { PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";

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

  async execute(dto: CreateTransactionServiceDTO, userId: string) {
    const wallet = await this.walletRepository.getById(dto.walletId);
    const userWallets = wallet.userWallets.map(userWallet => userWallet.userProfileId);

    if (!userWallets.includes(userId)) {
      throw new Error("Usuário não faz parte dessa carteira");
    }

    const transaction = await this.transactionRepository.create({
      ...dto
    });

    return transaction;
  }
}
