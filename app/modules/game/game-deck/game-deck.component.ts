import { Component, Input } from '@angular/core';
import { GameFieldCellType } from '../game-field/enums/game-field-cell-type.enum';
import { GameDeckCard } from './models/game-deck-card';
import { GameDeckService } from './services/game-deck.service';

@Component({
	moduleId: module.id,
	selector: 'game-deck',
	templateUrl: 'tmpl/game-deck.html',
	styleUrls: ['styles/game-deck.css']
})
export class GameDeckComponent  {

	constructor(
		private gameDeckService: GameDeckService
	) {

	}
}
