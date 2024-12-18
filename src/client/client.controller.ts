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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { clients as ClientModel } from '@prisma/client';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /**
   * Create a new client
   *
   * @remarks This operation allows you to create a new client.
   *
   */
  @ApiCreatedResponse({ type: ClientEntity })
  @Post()
  async createClient(
    @Body()
    createClientDto: CreateClientDto,
  ): Promise<ClientModel> {
    return new ClientEntity(
      await this.clientService.createClient({
        ...createClientDto,
      }),
    );
  }

  /**
   * Retrieve a client
   *
   * @remarks This operation allows you to retrieve a client.
   *
   * @throws {404} Not found exception if the client does not exist.
   */
  @ApiOkResponse({ type: ClientEntity })
  @Get(':id')
  async getClient(@Param('id', ParseIntPipe) id: number): Promise<ClientModel> {
    return new ClientEntity(await this.clientService.client({ id }));
  }

  /**
   * Update a client
   *
   * @remarks This operation allows you to update a client.
   *
   * @throws {404} Not found exception if the client does not exist.
   */
  @ApiOkResponse({ type: ClientEntity })
  @Put(':id')
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateClientDto: UpdateClientDto,
  ): Promise<ClientModel> {
    return new ClientEntity(
      await this.clientService.updateClient({
        where: { id: id },
        data: { ...updateClientDto },
      }),
    );
  }

  /**
   * Delete a client
   *
   * @remarks This operation allows you to delete a client.
   *
   * @throws {404} Not found exception if the client does not exist.
   */
  @ApiOkResponse({ type: ClientEntity })
  @Delete(':id')
  async deleteClient(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientModel> {
    return new ClientEntity(await this.clientService.deleteClient({ id: id }));
  }
}
