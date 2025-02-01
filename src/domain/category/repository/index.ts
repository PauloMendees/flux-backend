import { Category } from "../entity";
import { CreateCategoryDTO } from "../entity/dto/create";
import { UpdateCategoryDTO } from "../entity/dto/update";

export interface CategoryRepository {
  create(dto: CreateCategoryDTO): Promise<Category>;
  update(dto: UpdateCategoryDTO): Promise<Category>;
  getById(id: string): Promise<Category>;
  remove(id: string): Promise<void>;
  list(userId: string): Promise<Category[]>;
}
