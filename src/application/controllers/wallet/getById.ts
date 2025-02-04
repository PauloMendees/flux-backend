import { Controller, Get, Param, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { GetWalletByIdService, GetWalletByIdServiceDto } from "src/service/wallet/getById";

@ApiTags(apiTags.wallet)
@Controller()
export class GetWalletByIdController {
  constructor(private readonly service: GetWalletByIdService) {}

  @ApiBearerAuth("JWT")
  @Get(`${routes.wallet.main}/:walletId`)
  async execute(@Param() params: GetWalletByIdServiceDto, @Request() req: CustomReq) {
    return this.service.execute(params, req.user.id);
  }
}
