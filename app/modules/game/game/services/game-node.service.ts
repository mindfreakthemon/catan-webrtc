import { Inject, Injectable } from '@angular/core';
import { GAME_CONFIGURATION } from '../../game.config';
import { GameConfiguration } from '../models/game-configuration';
import { PlayerNodeService } from '../../../player/player/services/player-node.service';
import { GameEvent } from '../enums/game-event.enum';
import { Observable } from 'rxjs/Observable';
import { PlayerToken } from '../enums/player-token.enum';
import { GameDiceRoll } from '../../game-dice-roller/models/game-dice-roll';
import { Broadcast, PeerId } from '../../game.dependencies';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export abstract class GameNodeService {

	public get id(): PeerId {
		return this.playerNodeService.id;
	}

	public get events(): Observable<any> {
		return this.playerNodeService.events
			.filter((event: any) => event.data.broadcast === Broadcast.GAME_EVENT)
			.map((event) => event.data.data);
	}

	protected constructor(
		@Inject(GAME_CONFIGURATION)
		public gameConfiguration: GameConfiguration,
		public playerNodeService: PlayerNodeService
	) {}

	public connect(): void {
		this.playerNodeService.connect();
	}

	public destroy(): void {
		this.playerNodeService.destroy();
	}

	public abstract broadcast(gameEvent: GameEvent, data: any): void;


	public abstract broadcastPlayerTokens(): void;

	public abstract registerPlayerToken(playerToken: PlayerToken): Promise<boolean>;

	public abstract getPlayerTokens(): Promise<any>;


	public abstract broadcastPlayerStartDiceRolls(): void;

	public abstract registerPlayerStartDiceRoll(playerGameDiceRoll: GameDiceRoll): Promise<boolean>;

	public abstract getPlayerStartDiceRoll(): Promise<[PeerId, GameDiceRoll][]>;


	public addGameEventListener<T = any>(gameEvent: GameEvent): Observable<T> {
		return this.events
			.filter((event: any) => event.gameEvent === gameEvent)
			.map((event) => event.data);
	}



	// abstract assignPlayers();
	//
	// abstract rollStartDice();
	//
	// abstract assignFirstVillage();
	//
	// abstract assignSecondVillage();
	//
	// abstract gatherInitialResources();
	//
	// abstract startTurn();
	//
	// abstract chooseUseCardOrProceed();
	//
	// abstract rollDice();
	//
	// abstract foldHalfIfLots();
	//
	// abstract placeBlocker();
	//
	// abstract chooseVictim();
	//
	// abstract chooseVictimCard();
	//
	// abstract drawResourses();
	//
	// abstract tradeOrUseCardOrBuildOrNextTurn();
	//
	// abstract trade();
	//
	// abstract useCard();
	//
	// abstract build();
	//
	// abstract nextTurn();

}
