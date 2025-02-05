import { Module } from "@nestjs/common";
import { GetUserProfileService } from "src/application/service/userProfile/getUserProfile";
import { GetUserProfileClass } from "../controllers/userProfile/getUserProfile";
import { PrismaUserProfileRepository } from "src/infra/database/prisma-repositories/user-profile";

@Module({
  controllers: [GetUserProfileClass], // controllers
  providers: [PrismaUserProfileRepository, GetUserProfileService] // services
})
export class UserProfileModule {}
