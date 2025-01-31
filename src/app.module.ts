import { Module } from "@nestjs/common";
import { AuthModule } from "./application/modules/Auth.module";
import { JwtModule } from "@nestjs/jwt";
import { env } from "./infra/env";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./infra/security/auth";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SUPABASE_JWT_SECRET,
      signOptions: { expiresIn: "60s" }
    }),
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
