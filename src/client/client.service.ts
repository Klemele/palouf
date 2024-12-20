import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, clients } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(
    clientsWhereUniqueInput: Prisma.clientsWhereUniqueInput,
  ): Promise<clients | null> {
    const client = await this.prisma.clients.findUnique({
      where: clientsWhereUniqueInput,
    });

    if (!client) {
      throw new NotFoundException(
        `client with ${clientsWhereUniqueInput.id} does not exist.`,
      );
    }

    return client;
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
    //Ensure client exists
    await this.client({ id: params.where.id });

    const { where, data } = params;
    return this.prisma.clients.update({
      data,
      where,
    });
  }

  async deleteClient(where: Prisma.clientsWhereUniqueInput): Promise<clients> {
    //Ensure client exists
    await this.client({ id: where.id });

    return this.prisma.clients.delete({
      where,
    });
  }
}
