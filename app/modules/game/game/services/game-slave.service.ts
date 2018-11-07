import { GameNodeService } from './game-node.service';
import { Inject, Injectable } from '@angular/core';
import { GameConfiguration } from '../models/game-configuration';
import { GAME_CONFIGURATION } from '../../game.config';
import { PlayerToken } from '../enums/player-token.enum';
import { GameEvent } from '../enums/game-event.enum';
import { GameDiceRoll } from '../../game-dice-roller/models/game-dice-roll';
import { PeerId, PlayerSlaveService } from '../../game.dependencies';

@Injectable()
export class GameSlaveService extends GameNodeService {

	private requests: any[] = [];

	constructor(
		@Inject(GAME_CONFIGURATION)
		public gameConfiguration: GameConfiguration,
		public playerNodeService: PlayerSlaveService
	) {

		super(gameConfiguration, playerNodeService);

		this.events
			.subscribe(({ data }) => this.handleData(data));
	}


	public broadcast(gameEvent: GameEvent, data: any): void {
		/** noop */
	}


	public broadcastPlayerTokens(): void {
		/** noop */
	}

	public registerPlayerToken(playerToken: PlayerToken): Promise<boolean> {
		return this.playerNodeService.requestMaster('registerPlayerToken', playerToken);
	}

	public getPlayerTokens(): Promise<any> {
		return this.playerNodeService.requestMaster('getPlayerTokens');
	}


	public broadcastPlayerStartDiceRolls(): void {
		/** noop */
	}

	public registerPlayerStartDiceRoll(playerGameDiceRoll: GameDiceRoll): Promise<boolean> {
		return this.playerNodeService.requestMaster('registerPlayerStartDiceRoll', playerGameDiceRoll);
	}

	public getPlayerStartDiceRoll(): Promise<[PeerId, GameDiceRoll][]> {
		return this.playerNodeService.requestMaster('getPlayerStartDiceRoll');
	}

	private handleData(data: any): void {
		if (data.method) {
			this.requests = this.requests
				.filter((request) => {
					if (request.method === data.method) {
						request.resolve(data.data);

						return false;
					}

					return true;
				});
		}
	}
}
