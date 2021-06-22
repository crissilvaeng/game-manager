import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Game } from '../../Games/entities/game.entity';

@Table
export class Movement extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  move: string;

  @Column({
    type: DataType.STRING,
  })
  board: string;

  @Column({
    type: DataType.STRING,
  })
  turn: string;

  @Column({
    type: DataType.STRING,
  })
  player: string;

  @ForeignKey(() => Game)
  @Column({
    type: DataType.UUID,
  })
  gameId: string;

  @BelongsTo(() => Game)
  game: Game;
}
