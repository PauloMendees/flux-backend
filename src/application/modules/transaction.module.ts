import { Module } from "@nestjs/common";
import { PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";
import { CreateTransactionService } from "../service/transaction/create";
import { CreateTransactionController } from "../controllers/transaction/create";
import { PrismaTransactionRepository } from "src/infra/database/prisma-repositories/transaction";
import { UpdateTransactionService } from "../service/transaction/update";
import { ListTransactionsByWalletService } from "../service/transaction/listByWallet";
import { DeleteTransactionService } from "../service/transaction/delete";
import { GetTransactionByIdService } from "../service/transaction/getById";
import { UpdateTransactionController } from "../controllers/transaction/update";
import { GetTransactionByIdController } from "../controllers/transaction/getById";
import { DeleteTransactionController } from "../controllers/transaction/delete";
import { ListTransactionsByWalletController } from "../controllers/transaction/listByWallet";

@Module({
  controllers: [
    CreateTransactionController,
    UpdateTransactionController,
    GetTransactionByIdController,
    DeleteTransactionController,
    ListTransactionsByWalletController
  ], // controllers
  providers: [
    PrismaWalletRepository,
    PrismaTransactionRepository,
    CreateTransactionService,
    UpdateTransactionService,
    ListTransactionsByWalletService,
    DeleteTransactionService,
    GetTransactionByIdService
  ] // services
})
export class TransactionModule {}
