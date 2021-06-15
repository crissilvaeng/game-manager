import { Controller, Post } from '@nestjs/common';
import { Game } from 'src/games/entities/game.entity';
import { PublisherService } from '../services/games.publisher.service';

@Controller()
export class GamesPublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  publishNewGame(game: Game): { result: { success: boolean } } {
    const result = this.publisherService.publish(game);
    return {
      result,
    };
  }
}
