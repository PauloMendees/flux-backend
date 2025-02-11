import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const handleError = (error: any | unknown) => {
  console.log(error);
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      throw new NotFoundException("Item não encontrado");
    }
  }
  throw new BadRequestException("Erro interno de servidor, contate o suporte.");
};
