import { Module } from "@nestjs/common";
import { AuthModule } from "./application/modules/Auth.module";
import { JwtModule } from "@nestjs/jwt";
import { env } from "./infra/env";

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
  providers: []
})
export class AppModule {}
