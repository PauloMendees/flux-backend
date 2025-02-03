import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PrismaCategoryRepository } from "src/infra/database/prisma-repositories/category";

export class UpdateCategoryServiceDTO {
  @ApiProperty({ type: "string" })
  id: string;
  @ApiProperty({ type: "string" })
  name: string;
  @ApiProperty({ type: "string", required: false })
  description?: string;
  @ApiProperty({ type: "string", required: false })
  customColor?: string;
}

@Injectable()
export class UpdateCategoryService {
  constructor(private readonly repository: PrismaCategoryRepository) {}

  async execute(dto: UpdateCategoryServiceDTO, userId: string) {
    return await this.repository.update({ ...dto, userProfileId: userId });
  }
}
