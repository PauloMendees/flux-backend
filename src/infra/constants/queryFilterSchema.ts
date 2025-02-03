import { string, z } from "zod";
import { numeric } from "./zodNumeric";
import { ApiProperty } from "@nestjs/swagger";

export type DefaultQueryFilter = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export class DefaultFiltersDto {
  @ApiProperty({ type: "number", required: false })
  page?: number;
  @ApiProperty({ type: "number", required: false })
  pageSize?: number;
  @ApiProperty({ type: "string", required: false })
  search?: string;
}

export const queryFilterSchema = z.object({
  page: numeric.default("1"),
  pageSize: numeric.default("10"),
  search: string().optional()
});
