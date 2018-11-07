import { Component, Input } from '@angular/core';
import { GameDeckCard } from './models/game-deck-card';

@Component({
	moduleId: module.id,
	selector: 'game-deck-hand',
	templateUrl: 'tmpl/game-deck-hand.html',
	styleUrls: ['styles/game-deck-hand.css']
})
export class GameDeckHandComponent  {

	@Input()
	hand: GameDeckCard[];
}
