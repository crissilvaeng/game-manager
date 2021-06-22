import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGameDto } from '../entities/create-game.dto';
import { GameDto } from '../entities/game.dto';
import { Game } from '../entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game)
    private gameModel: typeof Game,
    private httpService: HttpService,
  ) {}

  async findAll(): Promise<Game[]> {
    return this.gameModel.findAll();
  }

  async findByTournament(id: string): Promise<Game[]> {
    return this.gameModel.findAll({where: {
      tournamentId: id
    }});
  }

  async findOne(id: string): Promise<Game> {
    return this.gameModel.findByPk(id);
  }

  async create(game: CreateGameDto): Promise<GameDto> {
    return this.gameModel.create(game);
  }

  async edit(game: Game): Promise<[number, Game[]]> {
    return this.gameModel.update(game, {
      where: {
        id: game.id,
      },
    });
  }

  async delete(id: string) {
    const game: Game = await this.findOne(id);
    game.destroy();
  }

  async postGame(game: GameDto) {
    
    const url = process.env.POST_GAME_URL;
    const data = JSON.stringify(game);
    const config = { type: 'POST', headers: {
      'accept': '*/*',
      'Authorization': 'Bearer ' + process.env.API_KEY,
      'content_type': 'application/json'
    }}
    
    this.httpService.post(url,data,config)
    
  }
}
