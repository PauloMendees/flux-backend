import { Injectable } from "@nestjs/common";
import { IdDto } from "src/infra/constants/idDto";
import { PrismaTransactionRepository } from "src/infra/database/prisma-repositories/transaction";
import { verifyIfUserCanHandleTransaction } from "src/infra/utils/transaction/verifyIfUserCanHandleTransaction";

@Injectable()
export class DeleteTransactionService {
  constructor(private readonly transactionRepository: PrismaTransactionRepository) {}

  async execute(dto: IdDto, userId: string) {
    await verifyIfUserCanHandleTransaction({
      transactionRepository: this.transactionRepository,
      transactionId: dto.id,
      userProfileId: userId
    });

    await this.transactionRepository.remove(dto.id);
  }
}
