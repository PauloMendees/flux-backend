import { ApiProperty } from "@nestjs/swagger";

export class IdDto {
  @ApiProperty({ type: "string" })
  id: string;
}
