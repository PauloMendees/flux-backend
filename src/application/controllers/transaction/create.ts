import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateTransactionService, CreateTransactionServiceDTO } from "src/application/service/transaction/create";
import { apiTags } from "src/infra/constants/apiTags";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { number, object, string } from "zod";

const schema = object({
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
export class CreateTransactionController {
  constructor(private readonly createTransactionService: CreateTransactionService) {}

  @ApiBearerAuth("JWT")
  @Post(routes.transaction.main)
  async execute(@Body() body: CreateTransactionServiceDTO, @Request() req: CustomReq) {
    try {
      validateSchema(body, schema);
      const response = await this.createTransactionService.execute(body, req?.user?.id);

      return response;
    } catch (error) {
      handleError(error);
    }
  }
}
