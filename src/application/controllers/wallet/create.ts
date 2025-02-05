import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { CreateWalletService, CreateWalletServiceDto } from "src/application/service/wallet/create";
import { object, string } from "zod";

const schema = object({
  name: string(),
  description: string().nullable()
});

@ApiTags(apiTags.wallet)
@Controller()
export class CreateWalletController {
  constructor(private readonly service: CreateWalletService) {}

  @ApiBearerAuth("JWT")
  @Post(routes.wallet.main)
  async execute(@Body() dto: CreateWalletServiceDto, @Request() req: CustomReq) {
    validateSchema(dto, schema);

    return await this.service.execute(dto, req.user.id);
  }
}
