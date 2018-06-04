import { GameNodeService } from './game-node.service';
import { Inject, Injectable } from '@angular/core';
import { GameConfiguration } from '../models/game-configuration';
import { GAME_CONFIGURATION } from '../../game.config';
import { PlayerSlaveService } from '../../../player/player/services/player-slave.service';
import { PlayerToken } from '../enums/player-token.enum';
import { GameEvent } from '../enums/game-event.enum';

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


	broadcast(gameEvent: GameEvent, data: any): void {
		/** noop */
	}

	broadcastPlayerTokens(): void {
		/** noop */
	}

	registerPlayerToken(playerToken: PlayerToken): Promise<boolean> {
		return this.playerNodeService.requestMaster('registerPlayerToken', playerToken);
	}

	getPlayerTokens(): Promise<any> {
		return this.playerNodeService.requestMaster('getPlayerTokens');
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
