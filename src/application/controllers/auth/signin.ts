import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { routes } from "src/infra/routes";
import { SkipAuth } from "src/infra/security/skipAuth";
import { validateSchema } from "src/infra/validations/validateSchema";
import { SigninRequestDTO, SigninService } from "src/service/auth/signin";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

@ApiTags("Authentication")
@Controller()
export class SigninController {
  constructor(private readonly service: SigninService) {}

  @SkipAuth()
  @Post(routes.auth.signin)
  async execute(@Body() body: SigninRequestDTO) {
    validateSchema(body, loginSchema);
    const response = await this.service.execute(body);
    return response;
  }
}
