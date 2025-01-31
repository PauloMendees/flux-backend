import { Injectable } from "@nestjs/common";
import { AuthRepository } from "src/domain/auth/repository";
import { supabase } from "../supabaseClient";
import { SignupDTO } from "src/domain/auth/entity/dto/signup";
import { AuthResponse } from "@supabase/supabase-js";

@Injectable()
export class SupabaseAuthRepository implements AuthRepository {
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
