import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "src/domain/transaction/entity";
import { PrismaTransactionRepository } from "src/infra/database/prisma-repositories/transaction";
import { verifyIfUserCanHandleTransaction } from "src/infra/utils/transaction/verifyIfUserCanHandleTransaction";

export class UpdateTransactionServiceDTO {
  @ApiProperty({ type: "string" })
  id: string;
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
export class UpdateTransactionService {
  constructor(private readonly transactionRepository: PrismaTransactionRepository) {}

  async execute(dto: UpdateTransactionServiceDTO, userId: string) {
    await verifyIfUserCanHandleTransaction({
      transactionRepository: this.transactionRepository,
      transactionId: dto.id,
      userProfileId: userId
    });

    const transaction = await this.transactionRepository.update(dto);

    return transaction;
  }
}
