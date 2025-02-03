import { Injectable } from "@nestjs/common";
import { DefaultFiltersDto } from "src/infra/constants/queryFilterSchema";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";

@Injectable()
export class ListCategoriesService {
  constructor(private readonly repository: PrismaCategoryRepository) {}

  async execute(dto: DefaultFiltersDto, userId: string) {
    const items = await this.repository.list(dto, userId);
    const count = await this.repository.count(dto, userId);
    return {
      categories: items,
      count,
      currentPage: dto.page
    };
  }
}
