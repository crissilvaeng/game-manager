import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GamesService } from 'src/games/services/games.service';
import { Movement } from '../entities/movement.entity';
import { MovementsService } from '../services/movements.service';

@Controller()
export class SubscriberController {
  constructor(
    private gamesService: GamesService,
    private movementsService: MovementsService,
  ) {}

  @EventPattern('movement_created')
  async create(data: Record<string, unknown>) {
    console.log(data);
    this.gamesService.findOne(data.gameId as number).then(
      (game) =>
        function () {
          Movement.create({
            move: data.move,
            board: data.board,
            turn: data.turn,
            player: data.player,
            gameId: data.gameId,
            game: game,
          }).then(
            (movement) =>
              function () {
                this.movementsService.create(movement);
                //TODO: Adicionar o movimento ao game
              },
          );
        },
    );
  }
}
