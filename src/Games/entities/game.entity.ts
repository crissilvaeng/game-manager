import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

import { Movement } from '../../movement/entities/movement.entity';

export enum Color {
  White = 'White',
  Black = 'Black',
}

export enum Termination {
  Checkmate = 'Checkmate',
  Stalemate = 'Stalemate',
  InsufficientMaterial = 'InsufficientMaterial',
  ThreefoldRepetition = 'ThreefoldRepetition',
  FiftyMoves = 'FiftyMoves',
}

@Table
export class Game extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  white: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  black: string;

  @HasMany(() => Movement)
  moves: Movement[];

  @Column({
    type: DataType.ENUM(...Object.keys(Termination)),
    defaultValue: Termination.Checkmate,
  })
  termination: string;

  @Column({
    type: DataType.ENUM(...Object.keys(Color)),
    defaultValue: Color.White,
  })
  winner: string;

  @Column({
    type: DataType.STRING,
  })
  result: string;

  @Expose()
  @Column({
    type: DataType.STRING,
  })
  tournamentId: string;
}
