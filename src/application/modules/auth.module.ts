import { Module } from "@nestjs/common";
import { SignupController } from "../controllers/auth/signup";
import { SupabaseAuthRepository } from "../../infra/supabase/supabase-repositories/auth";
import { SignupService } from "src/service/auth/signup";
import { PrismaUserProfileRepository } from "src/infra/database/prisma-repositories/userProfile";
import { SigninService } from "src/service/auth/signin";
import { SigninController } from "../controllers/auth/signin";

@Module({
  controllers: [SignupController, SigninController], // controllers
  providers: [SupabaseAuthRepository, PrismaUserProfileRepository, SignupService, SigninService] // services
})
export class AuthModule {}
