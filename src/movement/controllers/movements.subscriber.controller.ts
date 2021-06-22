import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GamesService } from '../../Games/services/games.service';
import { Movement } from '../entities/movement.entity';
import { MovementsService } from '../services/movements.service';

@Controller()
export class SubscriberController {
  constructor(
    private gamesService: GamesService,
    private movementsService: MovementsService,
  ) {}

  @EventPattern('movement_created')
  async create(move: Movement) {
    console.log(move);
    var game = await this.gamesService.findOne(move.gameId);
    game.moves.push(move);
    move.game = game;
    move.save()
  }
}
