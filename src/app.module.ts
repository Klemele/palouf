import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import apiConfiguration from './config/api.config';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import { HealthReportModule } from './health-report/health-report.module';
import { PrismaModule } from './prisma/prisma.module';

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
    HealthReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
