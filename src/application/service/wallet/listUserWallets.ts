import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaUserWalletRepository } from "src/infra/database/prisma-repositories/wallet";

export class ListUserWalletsServiceDto {
  @ApiProperty({ type: "string" })
  userId: string;
}

@Injectable()
export class ListUserWalletsService {
  constructor(private readonly userWalletRepository: PrismaUserWalletRepository) {}

  async execute({ userId }: ListUserWalletsServiceDto) {
    const userWallets = await this.userWalletRepository.list(userId);

    return userWallets.map(userWallet => userWallet.wallet);
  }
}
