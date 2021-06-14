import { Controller, Get, Param } from '@nestjs/common';
import { Movement } from '../entities/movement.entity';
import { MovementsService } from '../services/movements.service';

@Controller('games')
export class GamesController {
  constructor(private movementsService: MovementsService) {}

  @Get()
  async getAll(): Promise<Movement[]> {
    return this.movementsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Movement> {
    return this.movementsService.findOne(params.id);
  }
}
