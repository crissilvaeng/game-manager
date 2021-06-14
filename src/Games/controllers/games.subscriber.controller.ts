import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GamesService } from 'src/games/services/games.service';
import { Game } from '../entities/game.entity';

@Controller()
export class SubscriberController {
  constructor(private gamesService: GamesService) {}

  @EventPattern('game_created')
  async create(data: Record<string, unknown>) {
    Game.create({
      white: data.white,
      black: data.black,
    }).then((game) => this.gamesService.create(game));
  }
}
