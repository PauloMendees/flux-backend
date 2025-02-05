import { Controller, Get, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { routes } from "src/infra/routes";
import { CustomReq } from "src/infra/security/auth";
import { GetUserProfileService } from "src/application/service/userProfile/getUserProfile";

@ApiTags(apiTags.profile)
@Controller()
export class GetUserProfileClass {
  constructor(private readonly service: GetUserProfileService) {}

  @ApiBearerAuth("JWT")
  @Get(routes.profile.getInfos)
  async execute(@Request() req: CustomReq) {
    const info = await this.service.execute(req.user.email);

    return info;
  }
}
