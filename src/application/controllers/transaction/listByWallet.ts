import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  ListTransactionsByWalletService,
  ListTransactionsByWalletServiceDto
} from "src/application/service/transaction/listByWallet";
import { apiTags } from "src/infra/constants/apiTags";
import { queryFilterSchema } from "src/infra/constants/queryFilterSchema";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { object, string } from "zod";

const schema = object({
  ...queryFilterSchema.shape,
  walletId: string()
});

@ApiTags(apiTags.transaction)
@Controller()
export class ListTransactionsByWalletController {
  constructor(private readonly service: ListTransactionsByWalletService) {}

  @ApiBearerAuth("JWT")
  @Get(routes.transaction.main)
  async execute(@Query() queryParams: ListTransactionsByWalletServiceDto, @Request() req: CustomReq) {
    try {
      const parsed = validateSchema(queryParams, schema);

      return await this.service.execute(parsed, req.user.id);
    } catch (error) {
      handleError(error);
    }
  }
}
