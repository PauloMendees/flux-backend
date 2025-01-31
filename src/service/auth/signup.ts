import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaUserProfileRepository } from "src/infra/database/prisma-repositories/userProfile";
import { SupabaseAuthRepository } from "src/infra/supabase/supabase-repositories/auth";

export class SignupRequestDTO {
  @ApiProperty({ type: "string" })
  email: string;
  @ApiProperty({ type: "string" })
  password: string;
  @ApiProperty({ type: "string" })
  first_name: string;
  @ApiProperty({ type: "string" })
  last_name: string;
}

@Injectable()
export class SignupService {
  constructor(
    private readonly authRepository: SupabaseAuthRepository,
    private readonly dbRepository: PrismaUserProfileRepository
  ) {}

  async execute(dto: SignupRequestDTO) {
    const { email, first_name, last_name } = dto;
    const response = await this.authRepository.signup(dto);
    await this.dbRepository.createUserProfile({
      email,
      first_name,
      last_name
    });

    return response;
  }
}
