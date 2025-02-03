import { z } from "zod";

export const numeric = z.string().regex(/^\d+$/).transform(Number);
