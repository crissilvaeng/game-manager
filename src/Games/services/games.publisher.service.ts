import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Game } from 'src/games/entities/game.entity';
import { EVENT_HUB } from './games.publisher.type';

@Injectable()
export class GamesPublisherService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(EVENT_HUB) private readonly client: ClientProxy) {}

  async onModuleInit(): Promise<void> {
    return this.client.connect();
  }

  onModuleDestroy(): void {
    return this.client.close();
  }

  publish(game: Game): { success: boolean } {
    this.client.emit('new_game', game);
    return {
      success: true,
    };
  }
}
