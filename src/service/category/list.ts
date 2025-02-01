import { Injectable } from "@nestjs/common";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";

@Injectable()
export class ListCategoriesService {
  constructor(private readonly repository: PrismaCategoryRepository) {}

  async execute(userId: string) {
    return await this.repository.list(userId);
  }
}
