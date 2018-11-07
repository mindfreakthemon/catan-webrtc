import { Component, Input } from '@angular/core';
import { GameFieldCellType } from '../game-field/enums/game-field-cell-type.enum';
import { GameDeckCard } from './models/game-deck-card';

@Component({
	moduleId: module.id,
	selector: 'game-deck-stack',
	templateUrl: 'tmpl/game-deck-stack.html',
	styleUrls: ['styles/game-deck-stack.css']
})
export class GameDeckHandComponent  {


	@Input()
	type: GameFieldCellType;

	@Input()
	stack: GameDeckCard[];

}
