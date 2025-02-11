import { Controller, Get, Param, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { GetTransactionByIdService } from "../../service/transaction/getById";
import { routes } from "src/infra/routes";
import { handleError } from "src/infra/errors/handleError";
import { IdDto } from "src/infra/constants/idDto";
import { CustomReq } from "src/infra/security/auth";

@ApiTags(apiTags.transaction)
@Controller()
export class GetTransactionByIdController {
  constructor(private readonly service: GetTransactionByIdService) {}

  @ApiBearerAuth("JWT")
  @Get(routes.transaction.main + "/:id")
  async execute(@Param() params: IdDto, @Request() req: CustomReq) {
    try {
      return await this.service.execute(params, req.user.id);
    } catch (error) {
      handleError(error);
    }
  }
}
