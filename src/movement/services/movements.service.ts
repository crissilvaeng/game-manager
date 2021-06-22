import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movement } from '../entities/movement.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement)
    private movementModel: typeof Movement,
  ) {}

  async findAll(): Promise<Movement[]> {
    return this.movementModel.findAll();
  }

  async findOne(id: number): Promise<Movement> {
    return this.movementModel.findByPk(id);
  }

  async create(movement: Movement) {
    this.movementModel.create(movement);
  }
}
