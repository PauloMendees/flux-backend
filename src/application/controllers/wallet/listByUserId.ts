import { Controller, Get, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { ListUserWalletsService } from "src/application/service/wallet/listUserWallets";

@ApiTags(apiTags.wallet)
@Controller()
export class ListWalletsByUserIdController {
  constructor(private readonly service: ListUserWalletsService) {}

  @ApiBearerAuth("JWT")
  @Get(`${routes.wallet.main}`)
  async execute(@Request() req: CustomReq) {
    return await this.service.execute({ userId: req.user.id });
  }
}
