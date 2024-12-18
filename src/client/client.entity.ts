import { clients as ClientModel } from '@prisma/client';

export class ClientEntity implements ClientModel {
  id: number;
  first_name: string;
  last_name: string;
}
