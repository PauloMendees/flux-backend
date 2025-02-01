import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";

@Injectable()
export class DeleteCategoryService {
  constructor(private readonly repository: PrismaCategoryRepository) {}

  async execute(categoryId: string, userId: string) {
    const category = await this.repository.getById(categoryId);
    if (category.userProfileId !== userId) throw new UnauthorizedException("Não autorizado");

    await this.repository.remove(categoryId);
  }
}
