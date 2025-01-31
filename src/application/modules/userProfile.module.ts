import { Module } from "@nestjs/common";
import { PrismaUserProfileRepository } from "src/infra/database/prisma-repositories/userProfile";
import { GetUserProfileService } from "src/service/userProfile/getUserProfile";
import { GetUserProfileClass } from "../controllers/userProfile/getUserProfile";

@Module({
  controllers: [GetUserProfileClass], // controllers
  providers: [PrismaUserProfileRepository, GetUserProfileService] // services
})
export class UserProfileModule {}
