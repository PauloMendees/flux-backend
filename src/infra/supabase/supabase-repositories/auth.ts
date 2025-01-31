import { Injectable } from "@nestjs/common";
import { AuthRepository } from "src/domain/auth/repository";
import { supabase } from "../supabaseClient";
import { SignupDTO } from "src/domain/auth/entity/dto/signup";
import { AuthResponse } from "@supabase/supabase-js";
import { SigninDTO } from "src/domain/auth/entity/dto/signin";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class SupabaseAuthRepository implements AuthRepository {
  async signin({ email, password }: SigninDTO): Promise<string> {
    try {
      const loginResponse = await supabase.auth.signInWithPassword({
        email: email,
        password
      });

      if (loginResponse.error) throw new UnauthorizedException("Credenciais inválidas");

      return loginResponse?.data?.session?.access_token;
    } catch (error) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
  }

  async signup({ first_name, last_name, ...dto }: SignupDTO): Promise<AuthResponse> {
    const response = await supabase.auth.signUp({
      ...dto,
      options: {
        emailRedirectTo: "www.google.com",
        data: {
          first_name,
          last_name
        }
      }
    });

    return response;
  }
}
