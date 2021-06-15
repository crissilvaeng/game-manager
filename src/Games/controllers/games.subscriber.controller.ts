import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GamesService } from 'src/games/services/games.service';
import { Game } from '../entities/game.entity';

@Controller()
export class SubscriberController {
  constructor(private gamesService: GamesService) {}

  @EventPattern('create_game')
  async handleGameCreated(data: Record<string, unknown>) {
    console.log(data);
    Game.create({
      white: data.white,
      black: data.black,
    }).then((game) => this.gamesService.create(game));
  }
}
