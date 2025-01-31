import { Module } from "@nestjs/common";
import { SignupController } from "../controllers/auth/signup";
import { SupabaseAuthRepository } from "../../infra/supabase/supabase-repositories/auth";
import { SignupService } from "src/service/auth/signup";
import { PrismaUserProfileRepository } from "src/infra/database/prisma-repositories/userProfile";

@Module({
  controllers: [SignupController], // controllers
  providers: [SupabaseAuthRepository, PrismaUserProfileRepository, SignupService] // services
})
export class AuthModule {}
