import { Module } from '@nestjs/common';
import { SubscriberController } from './games.subscriber.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [SubscriberController],
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
