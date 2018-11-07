import { Inject, Injectable } from '@angular/core';
import { GAME_CONFIGURATION } from '../../game.config';
import { PeerId } from '../../game.dependencies';
import { GameConfiguration } from '../../game/models/game-configuration';
import { GameNodeService } from '../../game/services/game-node.service';
import { GameFieldCellType } from '../../game-field/enums/game-field-cell-type.enum';
import { GameDeckCard } from '../models/game-deck-card';

@Injectable()
export class GameDeckService {

	public hands = new Map<PeerId, GameDeckCard[]>();

	public decks = new Map<GameFieldCellType, GameDeckCard[]>();

	constructor(
		@Inject(GAME_CONFIGURATION)
		public gameConfiguration: GameConfiguration,
		public gameNodeService: GameNodeService
	) {

		const cardsPerStack = gameConfiguration.cardsPerStack;

		Object.keys(GameFieldCellType)
			.forEach((key) => {
				const cards = Array(cardsPerStack).fill({
					type: GameFieldCellType[key]
				});

				this.decks.set(GameFieldCellType[key], cards);
			});
	}


}
