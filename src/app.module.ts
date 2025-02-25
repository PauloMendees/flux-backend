import { Module } from "@nestjs/common";
import { AuthModule } from "./application/modules/Auth.module";
import { JwtModule } from "@nestjs/jwt";
import { env } from "./infra/env";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./infra/security/auth";
import { UserProfileModule } from "./application/modules/userProfile.module";
import { CategoryModule } from "./application/modules/category.module";
import { WalletModule } from "./application/modules/wallet.module";
import { TransactionModule } from "./application/modules/transaction.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SUPABASE_JWT_SECRET,
      signOptions: { expiresIn: "60s" }
    }),
    AuthModule,
    UserProfileModule,
    CategoryModule,
    WalletModule,
    TransactionModule
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
