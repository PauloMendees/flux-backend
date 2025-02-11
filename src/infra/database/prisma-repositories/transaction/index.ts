import { Injectable } from "@nestjs/common";
import { Transaction } from "src/domain/transaction/entity";
import { CreateTransactionDTO } from "src/domain/transaction/entity/dto/create";
import { UpdateTransactionDTO } from "src/domain/transaction/entity/dto/update";
import { ListTransactionFilter, TransactionRepository } from "src/domain/transaction/repository";
import { prismaClient } from "../../prisma";

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  async create(dto: CreateTransactionDTO): Promise<Transaction> {
    return await prismaClient.transaction.create({
      data: { ...dto },
      include: { wallet: true }
    });
  }

  async update({ id, ...dto }: UpdateTransactionDTO): Promise<Transaction> {
    return await prismaClient.transaction.update({
      where: { id },
      data: { ...dto },
      include: { wallet: true }
    });
  }

  async remove(id: string): Promise<void> {
    await prismaClient.transaction.delete({ where: { id } });
  }

  async getById(id: string): Promise<Transaction> {
    return await prismaClient.transaction.findUniqueOrThrow({ where: { id }, include: { wallet: true } });
  }

  async list({ walletId, search, page, pageSize }: ListTransactionFilter): Promise<Transaction[]> {
    return prismaClient.transaction.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        AND: [
          {
            walletId
          },
          {
            OR: [{ title: { contains: search } }, { description: { contains: search } }]
          }
        ]
      },
      include: {
        wallet: true
      }
    });
  }
  async count({ walletId, search }: Omit<ListTransactionFilter, "page" | "pageSize">): Promise<number> {
    return prismaClient.transaction.count({
      where: {
        AND: [
          {
            walletId
          },
          {
            OR: [{ title: { contains: search } }, { description: { contains: search } }]
          }
        ]
      }
    });
  }
}
