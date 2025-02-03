import { Controller, Get, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { handleError } from "src/infra/errors/handleError";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { ListCategoriesService } from "src/service/category/list";

@ApiTags(apiTags.category)
@Controller()
export class ListCategoriesController {
  constructor(private readonly service: ListCategoriesService) {}

  @ApiBearerAuth("JWT")
  @Get(routes.category)
  async execute(@Request() req: CustomReq) {
    try {
      return await this.service.execute(req.user.id);
    } catch (error) {
      handleError(error);
    }
  }
}
