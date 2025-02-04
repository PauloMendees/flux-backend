import { Controller, Delete, Param, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { DeleteWalletService, DeleteWalletServiceDto } from "src/service/wallet/delete";

@ApiTags(apiTags.wallet)
@Controller()
export class DeleteWalletController {
  constructor(private readonly service: DeleteWalletService) {}

  @ApiBearerAuth("JWT")
  @Delete(`${routes.wallet.main}/:walletId`)
  async execute(@Param() params: DeleteWalletServiceDto, @Request() req: CustomReq) {
    await this.service.execute(params, req.user.id);
  }
}
