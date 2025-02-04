import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaUserWalletRepository, PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";

export class DeleteWalletServiceDto {
  @ApiProperty({ type: "string", required: true })
  walletId: string;
  @ApiProperty({ type: "string", required: true })
  userProfileId: string;
}

@Injectable()
export class DeleteWalletService {
  constructor(
    private readonly walletRepository: PrismaWalletRepository,
    private readonly userWalletRepository: PrismaUserWalletRepository
  ) {}

  async execute({ walletId, userProfileId }: DeleteWalletServiceDto) {
    await this.walletRepository.delete(walletId, userProfileId);
    await this.userWalletRepository.delete(walletId, userProfileId);
  }
}
