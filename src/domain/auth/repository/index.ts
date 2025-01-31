import { SignupDTO } from "../entity/dto/signup";

export interface AuthRepository {
  signup(dto: SignupDTO): Promise<any>;
}
