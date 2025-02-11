import { Module } from "@nestjs/common";
import { PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";
import { CreateTransactionService } from "../service/transaction/create";
import { CreateTransactionController } from "../controllers/transaction/create";
import { PrismaTransactionRepository } from "src/infra/database/prisma-repositories/transaction";

@Module({
  controllers: [CreateTransactionController], // controllers
  providers: [PrismaWalletRepository, PrismaTransactionRepository, CreateTransactionService] // services
})
export class TransactionModule {}
