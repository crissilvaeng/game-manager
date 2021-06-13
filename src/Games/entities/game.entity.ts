import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Movement } from './movement.entity';

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

  @Column({
    type: DataType.UUID,
    unique: true,
  })
  white: string;

  @Column({
    type: DataType.UUID,
    unique: true,
  })
  black: string;

  @HasMany(() => Movement)
  moves: Movement[];

  @Column({
    type: DataType.ENUM(...Object.keys(Termination)),
  })
  termination: string;

  @Column({
    type: DataType.ENUM(...Object.keys(Termination)),
  })
  winner: string;

  @Column({
    type: DataType.STRING,
  })
  result: string;

  // TODO: implement outcome
}
