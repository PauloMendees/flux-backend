import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";

export class GetWalletByIdServiceDto {
  @ApiProperty({ type: "string" })
  walletId: string;
}

@Injectable()
export class GetWalletByIdService {
  constructor(private readonly repository: PrismaWalletRepository) {}

  async execute(dto: GetWalletByIdServiceDto, userId: string) {
    const wallet = await this.repository.getById(dto.walletId);

    const userWallet = wallet?.userWallets?.find(userWallet => userWallet.userProfileId === userId);

    if (!userWallet) throw new UnauthorizedException("Não autorizado");

    return wallet;
  }
}
