import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { clients as ClientModel } from '@prisma/client';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Get(':id')
  async getClient(@Param('id') id: string): Promise<ClientModel> {
    return this.clientService.client({ id: Number(id) });
  }

  @Post()
  async createClient(
    @Body()
    clientData: {
      first_name: string;
      last_name: string;
    },
  ): Promise<ClientModel> {
    const { first_name, last_name } = clientData;

    return this.clientService.createClient({
      first_name,
      last_name,
    });
  }

  @Put(':id')
  async updateClient(
    @Param('id') id: string,
    @Body()
    clientData: {
      first_name?: string;
      last_name?: string;
    },
  ): Promise<ClientModel> {
    const { first_name, last_name } = clientData;

    // TODO: Handle client not found

    return this.clientService.updateClient({
      where: { id: Number(id) },
      data: { first_name, last_name },
    });
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string): Promise<ClientModel> {
    // TODO: Handle client not found
    return this.clientService.deleteClient({ id: Number(id) });
  }
}
