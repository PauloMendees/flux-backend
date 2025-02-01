export interface CreateCategoryDTO {
  id: string;
  name: string;
  description?: string;
  customColor?: string;
  userProfileId?: string;
}
