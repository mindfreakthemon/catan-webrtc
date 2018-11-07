import { Injectable } from '@angular/core';
import { GameNodeService } from './game-node.service';

@Injectable()
export class GameContextService {

	private gameNodeService: GameNodeService;

	getService(): GameNodeService {
		return this.gameNodeService;
	}

	setService(gameNodeService: GameNodeService): void {
		this.gameNodeService = gameNodeService;
	}

}
