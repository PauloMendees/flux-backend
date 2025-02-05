import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/infra/constants/apiTags";
import { routes } from "src/infra/routes";
import { SkipAuth } from "src/infra/security/skipAuth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { SignupRequestDTO, SignupService } from "src/application/service/auth/signup";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string()
});

@ApiTags(apiTags.auth)
@Controller()
export class SignupController {
  constructor(private readonly service: SignupService) {}

  @SkipAuth()
  @Post(routes.auth.signup)
  async execute(@Body() body: SignupRequestDTO) {
    validateSchema(body, signupSchema);
    const response = await this.service.execute(body);

    return response;
  }
}
