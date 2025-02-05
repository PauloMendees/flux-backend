import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { SupabaseAuthRepository } from "src/infra/supabase/supabase-repositories/auth";

export class SigninRequestDTO {
  @ApiProperty({ type: "string" })
  email: string;
  @ApiProperty({ type: "string" })
  password: string;
}

@Injectable()
export class SigninService {
  constructor(private readonly authRepository: SupabaseAuthRepository) {}

  async execute(dto: SigninRequestDTO) {
    return await this.authRepository.signin(dto);
  }
}
