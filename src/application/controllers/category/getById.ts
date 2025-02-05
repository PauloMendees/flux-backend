import { Controller, Get, Param, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { GetCategoryByIdService, GetCategoryByIdServiceDto } from "src/application/service/category/getById";
import { object, string } from "zod";

const schema = object({
  id: string()
});

@ApiTags(apiTags.category)
@Controller()
export class GetCategoryByIdController {
  constructor(private readonly service: GetCategoryByIdService) {}

  @ApiBearerAuth("JWT")
  @Get(`${routes.category}/:id`)
  async execute(@Param() params: GetCategoryByIdServiceDto, @Request() req: CustomReq) {
    try {
      validateSchema(params, schema);
      return await this.service.execute(params, req.user.id);
    } catch (error) {
      handleError(error);
    }
  }
}
