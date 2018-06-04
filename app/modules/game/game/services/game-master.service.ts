import { GameNodeService } from './game-node.service';
import { Inject, Injectable } from '@angular/core';
import { GameConfiguration } from '../models/game-configuration';
import { GAME_CONFIGURATION } from '../../game.config';
import { PlayerMasterService } from '../../../player/player/services/player-master.service';
import { PeerId } from '../../../peer/peer/models/peer-id';
import { PlayerToken } from '../enums/player-token.enum';
import { GameEvent } from '../enums/game-event.enum';

@Injectable()
export class GameMasterService extends GameNodeService {

	playerTokens = new Map<PeerId, PlayerToken>();

	constructor(
		@Inject(GAME_CONFIGURATION)
		public gameConfiguration: GameConfiguration,
		public playerNodeService: PlayerMasterService
	) {

		super(gameConfiguration, playerNodeService);

		this.events
			.subscribe(({ peer, data }) => this.handleData(peer, data));
	}

	broadcast(gameEvent: GameEvent, data: any): void {
		this.playerNodeService.peerNodeService.broadcast({ gameEvent, data });
	}

	broadcastPlayerTokens(): void {
		this.broadcast(GameEvent.PLAYER_TOKEN_LIST_UPDATE, Array.from(this.playerTokens));
	}

	registerPlayerToken(playerToken: PlayerToken, peerId: PeerId = this.id): Promise<boolean> {
		if (Array.from(this.playerTokens.values()).includes(playerToken)) {
			if (this.playerTokens.get(peerId) !== playerToken) {
				return Promise.resolve(false);
			}
		}

		this.playerTokens.set(peerId, playerToken);

		this.broadcastPlayerTokens();

		return Promise.resolve(false);
	}

	getPlayerTokens(): Promise<any> {
		return Promise.resolve(Array.from(this.playerTokens));
	}

	private handleData(peerId: PeerId, data: any): void {
		if (data.method) {
			const method = data.method;

			if (this[method]) {
				this[method](...data.args, peerId)
					.then((response) => this.playerNodeService.peerNodeService.send(peerId, {
						method,
						data: response
					}));
			}
		}
	}
}
