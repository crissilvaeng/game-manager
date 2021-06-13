import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Color, Game } from './game.entity';

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
    board: string

    @Column({
        type: DataType.ENUM(...Object.keys(Color)),
      })
    turn: string

    @Column({
        type: DataType.UUID,
        })
    player: string

    @ForeignKey(() => Game)
    @Column
    gameId: string
    
    @BelongsTo(() => Game)
    game: Game
}

