import { Injectable } from '@nestjs/common';

import { Prisma, clients } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(
    clientsWhereUniqueInput: Prisma.clientsWhereUniqueInput,
  ): Promise<clients | null> {
    return this.prisma.clients.findUnique({
      where: clientsWhereUniqueInput,
    });
  }

  async createClient(data: Prisma.clientsCreateInput): Promise<clients> {
    return this.prisma.clients.create({
      data,
    });
  }

  async updateClient(params: {
    where: Prisma.clientsWhereUniqueInput;
    data: Prisma.clientsUpdateInput;
  }): Promise<clients> {
    const { where, data } = params;
    return this.prisma.clients.update({
      data,
      where,
    });
  }

  async deleteClient(where: Prisma.clientsWhereUniqueInput): Promise<clients> {
    return this.prisma.clients.delete({
      where,
    });
  }
}
