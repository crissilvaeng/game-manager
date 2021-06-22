import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { GamesModule } from '../games/games.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [GamesModule],
  providers: [
    {
      provide: 'EVENT_HUB',
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
  ],
})
export class SubscriberModule {}
