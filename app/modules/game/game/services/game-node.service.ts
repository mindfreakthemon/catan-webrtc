import { EventEmitter, Inject, Injectable } from '@angular/core';
import { GAME_CONFIGURATION } from '../../game.config';
import { GameConfiguration } from '../models/game-configuration';
import { PlayerNodeService } from '../../../player/player/services/player-node.service';
import { Broadcast } from '../../../player/player/enums/broadcast.enum';
import { GameEvent } from '../enums/game-event.enum';
import { Observable } from 'rxjs/Observable';
import { PeerId } from '../../../peer/peer/models/peer-id';
import { PlayerToken } from '../enums/player-token.enum';

@Injectable()
export abstract class GameNodeService {

	get id(): PeerId {
		return this.playerNodeService.id;
	}

	get events(): EventEmitter<any> {
		return this.playerNodeService.events;
	}

	constructor(
		@Inject(GAME_CONFIGURATION)
		public gameConfiguration: GameConfiguration,
		public playerNodeService: PlayerNodeService
	) {}

	connect(): void {
		this.playerNodeService.connect();
	}

	destroy(): void {
		this.playerNodeService.destroy();
	}

	abstract broadcast(gameEvent: GameEvent, data: any): void;

	abstract broadcastPlayerTokens(): void;

	abstract registerPlayerToken(playerToken: PlayerToken): Promise<boolean>;

	abstract getPlayerTokens(): Promise<any>;

	addGameEventListener(gameEvent: GameEvent): Observable<any> {
		return this.events
			.filter((event: any) => event.data.gameEvent === gameEvent)
			.map((event) => event.data.data);
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
