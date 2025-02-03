import { Module } from "@nestjs/common";
import { CreateCategoryController } from "../controllers/category/create";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";
import { CreateCategoryService } from "src/service/category/create";
import { UpdateCategoryController } from "../controllers/category/update";
import { UpdateCategoryService } from "src/service/category/update";

@Module({
  controllers: [CreateCategoryController, UpdateCategoryController], // controllers
  providers: [PrismaCategoryRepository, CreateCategoryService, UpdateCategoryService] // services
})
export class CategoryModule {}
