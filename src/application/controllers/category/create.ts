import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { CreateCategoryService, CreateCategoryServiceDTO } from "src/service/category/create";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  customColor: z.string().optional()
});

@ApiTags("Category")
@Controller()
export class CreateCategoryController {
  constructor(private readonly service: CreateCategoryService) {}

  @ApiBearerAuth("JWT")
  @Post(routes.category)
  async execute(@Body() body: CreateCategoryServiceDTO, @Request() req: CustomReq) {
    validateSchema(body, schema);

    const response = await this.service.execute(body, req?.user?.id);

    return response;
  }
}
