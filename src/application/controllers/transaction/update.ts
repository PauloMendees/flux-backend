import { Body, Controller, Put, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateTransactionService, UpdateTransactionServiceDTO } from "src/application/service/transaction/update";
import { apiTags } from "src/infra/constants/apiTags";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { number, object, string } from "zod";

const schema = object({
  id: string(),
  title: string(),
  description: string().optional().nullable(),
  value: number(),
  date: string().default(new Date().toISOString()),
  categoryId: string().optional().nullable(),
  walletId: string(),
  type: string()
});

@ApiTags(apiTags.transaction)
@Controller()
export class UpdateTransactionController {
  constructor(private readonly service: UpdateTransactionService) {}

  @ApiBearerAuth("JWT")
  @Put(routes.transaction.main)
  async execute(@Body() body: UpdateTransactionServiceDTO, @Request() req: CustomReq) {
    try {
      validateSchema(body, schema);
      return await this.service.execute(body, req?.user?.id);
    } catch (error) {
      handleError(error);
    }
  }
}
