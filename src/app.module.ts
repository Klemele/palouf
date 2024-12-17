import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import apiConfiguration from './config/api.config';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.example', '.env'],
      load: [apiConfiguration, databaseConfig],
      validate,
      expandVariables: true,
    }),
    ClientModule,
  ],
  controllers: [AppController, ClientController],
  providers: [AppService],
})
export class AppModule {}
