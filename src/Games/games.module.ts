import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { Game } from './entities/game.entity';
import { GamesController } from './controllers/games.controller';
import { GamesPublisherController } from './controllers/games.publisher.controller';
import { GamesService } from './services/games.service';
import { HttpModule, Module } from '@nestjs/common';
import { Movement } from 'src/movement/entities/movement.entity';
import { PublisherService } from './services/games.publisher.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriberController } from './controllers/games.subscriber.controller';

@Module({
  imports: [SequelizeModule.forFeature([Game, Movement]), HttpModule],
  controllers: [
    GamesController,
    SubscriberController,
    GamesPublisherController,
  ],
  providers: [
    GamesService,
    PublisherService,
    {
      provide: 'EVENT_HUB',
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
  ],
  exports: [GamesService],
})
export class GamesModule {}
