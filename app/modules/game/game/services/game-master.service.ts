import { GameNodeService } from './game-node.service';
import { Inject, Injectable } from '@angular/core';
import { GameConfiguration } from '../models/game-configuration';
import { GAME_CONFIGURATION } from '../../game.config';
import { PlayerToken } from '../enums/player-token.enum';
import { GameEvent } from '../enums/game-event.enum';
import { GameDiceRoll } from '../../game-dice-roller/models/game-dice-roll';
import { Broadcast, PeerId, PlayerMasterService } from '../../game.dependencies';

@Injectable()
export class GameMasterService extends GameNodeService {

	public playerTokens = new Map<PeerId, PlayerToken>();

	public playerStartDiceRolls = new Map<PeerId, GameDiceRoll>();

	constructor(
		@Inject(GAME_CONFIGURATION)
		public gameConfiguration: GameConfiguration,
		public playerNodeService: PlayerMasterService
	) {

		super(gameConfiguration, playerNodeService);

		this.events
			.subscribe(({ peer, data }) => this.handleData(peer, data));
	}

	public broadcast(gameEvent: GameEvent, data: any): void {
		this.playerNodeService.broadcast(Broadcast.GAME_EVENT,{ gameEvent, data });
	}


	// region playerTokens

	public broadcastPlayerTokens(): void {
		this.broadcast(GameEvent.PLAYER_TOKEN_LIST_UPDATE, Array.from(this.playerTokens));
	}

	public registerPlayerToken(playerToken: PlayerToken, peerId: PeerId = this.id): Promise<boolean> {
		if (Array.from(this.playerTokens.values()).includes(playerToken)) {
			if (this.playerTokens.get(peerId) !== playerToken) {
				return Promise.resolve(false);
			}
		}

		this.playerTokens.set(peerId, playerToken);

		this.broadcastPlayerTokens();

		return Promise.resolve(true);
	}

	public getPlayerTokens(): Promise<any> {
		return Promise.resolve(Array.from(this.playerTokens));
	}

	// endregion

	// region playerStartDiceRolls

	public broadcastPlayerStartDiceRolls(): void {
		this.broadcast(GameEvent.PLAYER_START_DICE_ROLL_UPDATE, Array.from(this.playerStartDiceRolls));
	}

	public registerPlayerStartDiceRoll(playerGameDiceRoll: GameDiceRoll, peerId: PeerId = this.id): Promise<boolean> {
		this.playerStartDiceRolls.set(peerId, playerGameDiceRoll);

		this.broadcastPlayerStartDiceRolls();

		return Promise.resolve(true);
	}

	public getPlayerStartDiceRoll(): Promise<[PeerId, GameDiceRoll][]> {
		return Promise.resolve(Array.from(this.playerStartDiceRolls));
	}

	// endregion

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
