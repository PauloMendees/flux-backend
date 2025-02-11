import { Controller, Delete, Param, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { routes } from "src/infra/routes";
import { handleError } from "src/infra/errors/handleError";
import { IdDto } from "src/infra/constants/idDto";
import { CustomReq } from "src/infra/security/auth";
import { DeleteTransactionService } from "src/application/service/transaction/delete";

@ApiTags(apiTags.transaction)
@Controller()
export class DeleteTransactionController {
  constructor(private readonly service: DeleteTransactionService) {}

  @ApiBearerAuth("JWT")
  @Delete(routes.transaction.main + "/:id")
  async execute(@Param() params: IdDto, @Request() req: CustomReq) {
    try {
      return await this.service.execute(params, req.user.id);
    } catch (error) {
      handleError(error);
    }
  }
}
