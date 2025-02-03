import { Module } from "@nestjs/common";
import { CreateCategoryController } from "../controllers/category/create";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";
import { CreateCategoryService } from "src/service/category/create";

@Module({
  controllers: [CreateCategoryController], // controllers
  providers: [PrismaCategoryRepository, CreateCategoryService] // services
})
export class CategoryModule {}
