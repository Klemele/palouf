import { clients as ClientModel } from '@prisma/client';

export class ClientEntity implements ClientModel {
  constructor(partial: Partial<ClientEntity>) {
    Object.assign(this, partial);
  }

  /**
   * A client id
   * @example 1
   */
  id: number;

  /**
   * A client first name
   * @example John
   */
  first_name: string;

  /**
   * A client last name
   * @example Doe
   */
  last_name: string;
}
