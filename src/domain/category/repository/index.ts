import { DefaultQueryFilter } from "src/infra/constants/queryFilterSchema";
import { Category } from "../entity";
import { CreateCategoryDTO } from "../entity/dto/create";
import { UpdateCategoryDTO } from "../entity/dto/update";

export interface CategoryRepository {
  create(dto: CreateCategoryDTO): Promise<Category>;
  update(dto: UpdateCategoryDTO): Promise<Category>;
  getById(id: string): Promise<Category>;
  remove(id: string): Promise<void>;
  list(filter: DefaultQueryFilter, userId: string): Promise<Category[]>;
  count(filter: Omit<DefaultQueryFilter, "page" | "pageSize">, userId: string): Promise<number>;
}
