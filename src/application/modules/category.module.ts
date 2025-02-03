import { Module } from "@nestjs/common";
import { CreateCategoryController } from "../controllers/category/create";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";
import { CreateCategoryService } from "src/service/category/create";
import { UpdateCategoryController } from "../controllers/category/update";
import { UpdateCategoryService } from "src/service/category/update";
import { ListCategoriesController } from "../controllers/category/list";
import { ListCategoriesService } from "../../service/category/list";
import { GetCategoryByIdController } from "../controllers/category/getById";
import { GetCategoryByIdService } from "src/service/category/getById";

@Module({
  controllers: [
    CreateCategoryController,
    UpdateCategoryController,
    ListCategoriesController,
    GetCategoryByIdController
  ], // controllers
  providers: [
    PrismaCategoryRepository,
    CreateCategoryService,
    UpdateCategoryService,
    ListCategoriesService,
    GetCategoryByIdService
  ] // services
})
export class CategoryModule {}
