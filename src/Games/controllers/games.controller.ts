import { Controller, Get, Param } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async getAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  async findByTornament(@Param() params): Promise<Game[]> {
    return this.gamesService.findByTournament(params.id);
  }
}
