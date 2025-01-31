import { BadRequestException } from "@nestjs/common";
import { z } from "zod";

export function validateSchema<T extends z.ZodTypeAny>(data: unknown, schema: T) {
  try {
    return schema.parse(data) as z.infer<T>;
  } catch (error) {
    throw new BadRequestException("Error on fields validation. Fields: " + error.issues.map(issue => issue.path[0]));
  }
}
