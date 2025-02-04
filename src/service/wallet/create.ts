import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaUserWalletRepository, PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";

export class CreateWalletServiceDto {
  @ApiProperty({ type: "string", required: true })
  name: string;
  @ApiProperty({ type: "string", required: false })
  description?: string;
  @ApiProperty({ type: "string", required: true })
  ownerId: string;
}

@Injectable()
export class CreateWalletService {
  constructor(
    private readonly walletRepository: PrismaWalletRepository,
    private readonly userWalletRepository: PrismaUserWalletRepository
  ) {}

  async execute(dto: CreateWalletServiceDto) {
    const wallet = await this.walletRepository.create(dto);
    const userWallet = await this.userWalletRepository.create({
      userProfileId: dto.ownerId,
      walletId: wallet.id
    });

    return userWallet;
  }
}
