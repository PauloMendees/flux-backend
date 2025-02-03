import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";

export class GetCategoryByIdServiceDto {
  @ApiProperty()
  id: string;
}

@Injectable()
export class GetCategoryByIdService {
  constructor(private readonly repository: PrismaCategoryRepository) {}

  async execute(dto: GetCategoryByIdServiceDto, userId: string) {
    const category = await this.repository.getById(dto.id);
    if (category.userProfileId !== userId) throw new UnauthorizedException("Não autorizado");

    return await this.repository.getById(dto.id);
  }
}
