import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaUserWalletRepository, PrismaWalletRepository } from "src/infra/database/prisma-repositories/wallet";
import { verifyIfUserIsWalletOwner } from "src/infra/utils/wallet/verifyIfUserIsOwner";

export class DeleteWalletServiceDto {
  @ApiProperty({ type: "string", required: true })
  walletId: string;
}

@Injectable()
export class DeleteWalletService {
  constructor(
    private readonly walletRepository: PrismaWalletRepository,
    private readonly userWalletRepository: PrismaUserWalletRepository
  ) {}

  async execute({ walletId }: DeleteWalletServiceDto, userProfileId: string) {
    await verifyIfUserIsWalletOwner({
      walletRepository: this.walletRepository,
      walletId,
      userProfileId
    });
    await this.walletRepository.delete(walletId);
    await this.userWalletRepository.delete(walletId, userProfileId);
  }
}
