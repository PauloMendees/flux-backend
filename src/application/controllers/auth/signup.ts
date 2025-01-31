import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { routes } from "src/infra/routes";
import { validateSchema } from "src/infra/validations/validateSchema";
import { SignupRequestDTO, SignupService } from "src/service/auth/signup";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string()
});

@ApiTags("Authentication")
@Controller()
export class SignupController {
  constructor(private readonly service: SignupService) {}

  @Post(routes.auth.signup)
  async execute(@Body() body: SignupRequestDTO) {
    validateSchema(body, signupSchema);
    const response = await this.service.execute(body);

    return response;
  }
}
