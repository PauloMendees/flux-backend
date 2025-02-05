import { Module } from "@nestjs/common";
import { PrismaUserWalletRepository, PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";
import { CreateWalletService } from "src/application/service/wallet/create";
import { DeleteWalletService } from "src/application/service/wallet/delete";
import { ListUserWalletsService } from "src/application/service/wallet/listUserWallets";
import { DeleteWalletController } from "../controllers/wallet/delete";
import { CreateWalletController } from "../controllers/wallet/create";
import { ListWalletsByUserIdController } from "../controllers/wallet/listByUserId";
import { GetWalletByIdController } from "../controllers/wallet/getById";
import { GetWalletByIdService } from "src/application/service/wallet/getById";

@Module({
  controllers: [DeleteWalletController, CreateWalletController, ListWalletsByUserIdController, GetWalletByIdController], // controllers
  providers: [
    PrismaWalletRepository,
    PrismaUserWalletRepository,
    CreateWalletService,
    DeleteWalletService,
    ListUserWalletsService,
    GetWalletByIdService
  ] // services
})
export class WalletModule {}
