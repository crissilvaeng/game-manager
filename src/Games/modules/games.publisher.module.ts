import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { GamesPublisherController } from './games.publisher.controller';
import { GamesPublisherService } from './games.publisher.service';
import { EVENT_HUB } from './games.publisher.type';

@Module({
  controllers: [GamesPublisherController],
  providers: [
    {
      provide: EVENT_HUB,
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
    GamesPublisherService,
  ],
})
export class PublisherModule {}
