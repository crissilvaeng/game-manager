import { ConfigService } from '@nestjs/config';
import { HealthController } from './health.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: config.get('database.dialect'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    TerminusModule
  ],
  controllers: [HealthController],
})
export class HealthModule {}
