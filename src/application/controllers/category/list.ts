import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { DefaultFiltersDto, queryFilterSchema } from "src/infra/constants/queryFilterSchema";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { ListCategoriesService } from "src/service/category/list";

@ApiTags(apiTags.category)
@Controller()
export class ListCategoriesController {
  constructor(private readonly service: ListCategoriesService) {}

  @ApiBearerAuth("JWT")
  @Get(routes.category)
  async execute(@Request() req: CustomReq, @Query() query: DefaultFiltersDto) {
    try {
      const parsed = validateSchema(query, queryFilterSchema);
      return await this.service.execute(parsed, req.user.id);
    } catch (error) {
      handleError(error);
    }
  }
}
