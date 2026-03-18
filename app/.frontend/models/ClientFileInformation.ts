import type { Client } from '~/generated/prisma/client';

export interface ClientFileInformation {
  client: Client;
  description: string;
  file: File;
}
