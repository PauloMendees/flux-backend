import { Injectable } from "@nestjs/common";
import { PrismaUserProfileRepository } from "src/infra/database/prisma-repositories/user-profile";

@Injectable()
export class GetUserProfileService {
  constructor(private readonly repository: PrismaUserProfileRepository) {}

  async execute(email: string) {
    return await this.repository.getUserProfile(email);
  }
}
