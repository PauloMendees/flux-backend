import { Injectable } from "@nestjs/common";
import { Wallet } from "src/domain/wallet/entity";
import { CreateWalletDto } from "src/domain/wallet/entity/dto/create";
import { UpdateWalletDto } from "src/domain/wallet/entity/dto/update";
import { WalletRepository } from "src/domain/wallet/repository";
import { prismaClient } from "../../prisma";

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
  async create(dto: CreateWalletDto): Promise<Wallet> {
    const response = await prismaClient.wallet.create({
      data: {
        ...dto
      }
    });

    return response;
  }

  async update({ id, ...dto }: UpdateWalletDto): Promise<Wallet> {
    const response = await prismaClient.wallet.update({
      where: {
        id
      },
      data: dto
    });

    return response;
  }

  async delete(walletId: string, ownerId: string): Promise<void> {
    await prismaClient.wallet.update({
      where: {
        id: walletId,
        AND: [
          {
            ownerId
          }
        ]
      },
      data: {
        deleted: true
      }
    });
  }
}
