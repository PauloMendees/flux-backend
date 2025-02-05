import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { CreateCategoryService, CreateCategoryServiceDTO } from "src/application/service/category/create";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  customColor: z.string().optional()
});

@ApiTags(apiTags.category)
@Controller()
export class CreateCategoryController {
  constructor(private readonly service: CreateCategoryService) {}

  @ApiBearerAuth("JWT")
  @Post(routes.category)
  async execute(@Body() body: CreateCategoryServiceDTO, @Request() req: CustomReq) {
    try {
      validateSchema(body, schema);

      const response = await this.service.execute(body, req?.user?.id);

      return response;
    } catch (error) {
      handleError(error);
    }
  }
}
