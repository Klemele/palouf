import { Test, TestingModule } from '@nestjs/testing';
import { clients as ClientModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let prismaService: PrismaService;
  let idInserted: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService, PrismaService],
    }).compile();

    service = module.get<ClientService>(ClientService);
    prismaService = module.get<PrismaService>(PrismaService);

    const data: Prisma.clientsCreateInput = {
      first_name: 'Henry',
      last_name: 'Bond',
    };
    const result = await prismaService.clients.create({ data });
    idInserted = result.id;
  });
  afterEach(async () => {
    await prismaService.clients.deleteMany({ where: {} });
  });

  describe('client', () => {
    it('should return a client when found', async () => {
      const id = idInserted;
      const client: ClientModel = {
        id,
        first_name: 'Henry',
        last_name: 'Bond',
      };

      const result = await service.client({ id });

      expect(result).toEqual(client);
    });

    it('should return null when client is not found', async () => {
      const id = 190128039;
      const result = await service.client({ id });

      expect(result).toBeNull();
    });
  });

  describe('createClient', () => {
    it('should create a new client', async () => {
      const clientInput = {
        first_name: 'Henry',
        last_name: 'Bond',
      };
      const result = await service.createClient(clientInput);

      const { id, ...resultWithoutID } = result;

      expect(resultWithoutID).toEqual(clientInput);
      expect(id).toBeTruthy();
    });
  });

  describe('updateClient', () => {
    it('should update an existing client', async () => {
      const clientInput = {
        first_name: 'William',
        last_name: 'King',
      };
      const id = idInserted;
      const client: ClientModel = {
        id,
        ...clientInput,
      };
      const updateParams = {
        where: { id },
        data: { ...clientInput },
      };
      const result = await service.updateClient(updateParams);

      expect(result).toMatchObject(client);
    });
    it('should return an error when client is not found', async () => {
      const id = 190128039;
      const clientInput = {
        first_name: 'William',
        last_name: 'King',
      };
      const updateParams = {
        where: { id },
        data: { ...clientInput },
      };
      const result = service.updateClient(updateParams);

      expect(result).rejects.toThrow();
    });
  });

  describe('deleteClient', () => {
    it('should delete a client', async () => {
      const id = idInserted;
      const client: ClientModel = {
        id,
        first_name: 'Henry',
        last_name: 'Bond',
      };
      const result = await service.deleteClient({ id });

      expect(result).toEqual(client);
    });
    it('should return an error when client is not found', async () => {
      const id = 190128039;
      const result = service.deleteClient({ id });

      expect(result).rejects.toThrow();
    });
  });
});
