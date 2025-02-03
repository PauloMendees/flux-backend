import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/category/entity";
import { CreateCategoryDTO } from "src/domain/category/entity/dto/create";
import { UpdateCategoryDTO } from "src/domain/category/entity/dto/update";
import { CategoryRepository } from "src/domain/category/repository";
import { prismaClient } from "../../prisma";
import { DefaultQueryFilter } from "src/infra/constants/queryFilterSchema";

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  async create(dto: CreateCategoryDTO): Promise<Category> {
    const response = await prismaClient.category.create({
      data: dto
    });

    return response;
  }

  async update({ id, ...dto }: UpdateCategoryDTO): Promise<Category> {
    return await prismaClient.category.update({
      where: {
        id
      },
      data: dto
    });
  }

  async getById(id: string): Promise<Category> {
    return await prismaClient.category.findUniqueOrThrow({
      where: {
        id: id
      }
    });
  }

  async remove(id: string): Promise<void> {
    await prismaClient.category.delete({
      where: {
        id
      }
    });
  }

  async count({ search }: Omit<DefaultQueryFilter, "page" | "pageSize">, userId: string): Promise<number> {
    return await prismaClient.category.count({
      where: {
        AND: [
          {
            userProfileId: userId
          },
          {
            OR: [
              {
                name: search
              },
              {
                description: search
              }
            ]
          }
        ]
      }
    });
  }

  async list({ page, pageSize, search }: DefaultQueryFilter, userId: string): Promise<Category[]> {
    return await prismaClient.category.findMany({
      where: {
        AND: [
          {
            userProfileId: userId
          },
          {
            OR: [
              {
                name: search
              },
              {
                description: search
              }
            ]
          }
        ]
      },
      take: pageSize,
      skip: (page - 1) * pageSize
    });
  }
}
