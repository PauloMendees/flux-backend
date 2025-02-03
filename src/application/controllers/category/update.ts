import { Body, Controller, Put, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { UpdateCategoryService, UpdateCategoryServiceDTO } from "src/service/category/update";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  customColor: z.string().optional()
});

@ApiTags("Category")
@Controller()
export class UpdateCategoryController {
  constructor(private readonly service: UpdateCategoryService) {}

  @ApiBearerAuth("JWT")
  @Put(`${routes.category}`)
  async execute(@Body() body: UpdateCategoryServiceDTO, @Request() req: CustomReq) {
    try {
      validateSchema(body, schema);

      const response = await this.service.execute(body, req?.user?.id);

      return response;
    } catch (error) {
      handleError(error);
    }
  }
}
