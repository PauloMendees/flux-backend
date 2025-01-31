import { UserProfile } from "../entity";

export interface UserProfileRepository {
  createUserProfile(userProfile: UserProfile): Promise<void>;
}
