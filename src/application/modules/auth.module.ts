import { Module } from "@nestjs/common";
import { SignupController } from "../controllers/auth/signup";
import { SupabaseAuthRepository } from "../../infra/supabase/supabase-repositories/auth";
import { SignupService } from "src/application/service/auth/signup";
import { SigninService } from "src/application/service/auth/signin";
import { SigninController } from "../controllers/auth/signin";
import { PrismaUserProfileRepository } from "src/infra/database/prisma-repositories/user-profile";

@Module({
  controllers: [SignupController, SigninController], // controllers
  providers: [SupabaseAuthRepository, PrismaUserProfileRepository, SignupService, SigninService] // services
})
export class AuthModule {}
