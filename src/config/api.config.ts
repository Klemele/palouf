import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
}));
