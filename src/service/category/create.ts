import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";

export class CreateCategoryServiceDTO {
  @ApiProperty({ type: "string" })
  name: string;
  @ApiProperty({ type: "string", required: false })
  description?: string;
  @ApiProperty({ type: "string", required: false })
  customColor?: string;
}

@Injectable()
export class CreateCategoryService {
  constructor(private readonly repository: PrismaCategoryRepository) {}

  async execute(dto: CreateCategoryServiceDTO, userId: string) {
    return await this.repository.create({ ...dto, userProfileId: userId });
  }
}
