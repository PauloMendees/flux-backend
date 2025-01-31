import { SigninDTO } from "../entity/dto/signin";
import { SignupDTO } from "../entity/dto/signup";

export interface AuthRepository {
  signup(dto: SignupDTO): Promise<any>;
  signin(dto: SigninDTO): Promise<string>;
}
