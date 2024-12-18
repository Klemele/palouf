import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { clients as ClientModel } from '@prisma/client';
import { CreateClientDto } from './client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async createClient(
    @Body()
    createClientDto: CreateClientDto,
  ): Promise<ClientModel> {
    const { first_name, last_name } = createClientDto;

    return this.clientService.createClient({
      first_name,
      last_name,
    });
  }

  @Get(':id')
  async getClient(@Param('id', ParseIntPipe) id: string): Promise<ClientModel> {
    return this.clientService.client({ id: Number(id) });
  }

  @Put(':id')
  async updateClient(
    @Param('id', ParseIntPipe) id: string,
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
  async deleteClient(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ClientModel> {
    // TODO: Handle client not found
    return this.clientService.deleteClient({ id: Number(id) });
  }
}
