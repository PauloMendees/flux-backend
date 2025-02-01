import { UserProfile } from "src/domain/userProfile/entity";

export interface Category {
  id: string;
  name: string;
  description?: string;
  customColor?: string;
  userProfileId?: string;
  user?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}
