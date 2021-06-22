import { ConfigModule, ConfigService } from '@nestjs/config';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Game } from './Games/entities/game.entity';
import { GamesModule } from './Games/games.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';
import { Movement } from './movement/entities/movement.entity';
import { Sequelize } from 'sequelize-typescript';
import { SubscriberModule } from './movement/movements.module';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from './config/configuration';

@Module({
  imports: [
    GamesModule,
    HealthModule,
    MorganModule,
    SubscriberModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env'],
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    {
      provide: 'SEQUELIZE',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const sequelize = new Sequelize({
          dialect: config.get('database.dialect'),
          host: config.get('database.host'),
          port: config.get('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.database'),
          repositoryMode: true,
        });
        sequelize.addModels([Game, Movement]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ],
})
export class AppModule {}
