import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movement } from '../movement.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement)
    private movementModel: typeof Movement,
  ) {}

  async obterTodos(): Promise<Movement[]> {
    return this.movementModel.findAll();
  }

  async obterUm(id: number): Promise<Movement> {
    return this.movementModel.findByPk(id);
  }

  async criar(movement: Movement) {
    this.movementModel.create(movement);
  }

  async alterar(movement: Movement): Promise<[number, Movement[]]> {
    return this.movementModel.update(movement, {
      where: {
        id: movement.id,
      },
    });
  }

  async apagar(id: number) {
    const movement: Movement = await this.obterUm(id);
    movement.destroy();
  }
}
