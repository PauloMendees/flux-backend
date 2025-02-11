import { Injectable } from "@nestjs/common";
import { UserWallet, Wallet } from "src/domain/wallet/entity";
import { CreateUserWalletDto, CreateWalletDto } from "src/domain/wallet/entity/dto/create";
import { UpdateWalletDto } from "src/domain/wallet/entity/dto/update";
import { UserWalletRepository, WalletRepository } from "src/domain/wallet/repository";
import { prismaClient } from "../../prisma";

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
  async getById(walletId: string): Promise<Wallet> {
    return await prismaClient.wallet.findUniqueOrThrow({
      where: {
        id: walletId
      },
      include: {
        userWallets: true
      }
    });
  }

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
      data: {
        ...dto,
        updatedAt: new Date()
      }
    });

    return response;
  }

  async delete(walletId: string): Promise<void> {
    await prismaClient.wallet.update({
      where: {
        id: walletId
      },
      data: {
        deleted: true
      }
    });
  }
}

@Injectable()
export class PrismaUserWalletRepository implements UserWalletRepository {
  async create(dto: CreateUserWalletDto): Promise<UserWallet> {
    return await prismaClient.userWallet.create({
      data: dto,
      include: {
        wallet: true
      }
    });
  }
  async delete(walletId: string, userId: string): Promise<void> {
    await prismaClient.userWallet.updateMany({
      where: {
        AND: [
          {
            walletId: walletId
          },
          {
            userProfileId: userId
          }
        ]
      },
      data: {
        deleted: true
      }
    });
  }
  async list(userId: string): Promise<UserWallet[]> {
    const response = await prismaClient.userWallet.findMany({
      where: {
        AND: [
          {
            userProfileId: userId
          },
          {
            deleted: false
          }
        ]
      },
      include: {
        wallet: true
      }
    });

    return response;
  }
}
