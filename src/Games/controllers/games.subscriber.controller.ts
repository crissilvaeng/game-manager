import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GamesService } from '../services/games.service';
import { CreateGameDto } from '../entities/create-game.dto';
import { Game } from '../entities/game.entity';

@Controller()
export class SubscriberController {
  constructor(private gamesService: GamesService) {}

  @EventPattern('create_game')
  async handleGameCreated(data: CreateGameDto) {
    console.log(JSON.stringify(data));
    this.gamesService.create(data);
    this.gamesService.postGame(data);
  }

  @EventPattern('game_finished')
  async handleGameFinished(gameReceived: Game) {
    console.log(gameReceived);
    var game = await this.gamesService.findOne(gameReceived.id);
    game.termination = gameReceived.termination;
    game.winner = gameReceived.winner;
    game.result = gameReceived.result;
    game.save();
  }
}
