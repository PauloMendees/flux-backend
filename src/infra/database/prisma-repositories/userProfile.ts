import { Injectable } from "@nestjs/common";
import { UserProfile } from "src/domain/userProfile/entity";
import { UserProfileRepository } from "src/domain/userProfile/repository";
import { prismaClient } from "../prisma";

@Injectable()
export class PrismaUserProfileRepository implements UserProfileRepository {
  async createUserProfile(userProfile: UserProfile): Promise<void> {
    await prismaClient.userProfile.create({
      data: { ...userProfile }
    });
  }
}
