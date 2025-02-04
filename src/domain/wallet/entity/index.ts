import { UserProfile } from "src/domain/userProfile/entity";

export interface Wallet {
  id?: string;
  name: string;
  description: string;
  deleted?: boolean;
  ownerId: string;
  owner?: UserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}
