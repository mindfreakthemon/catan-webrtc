import { Component, EventEmitter, Output } from '@angular/core';
import { GameDiceRoll } from './models/game-dice-roll';

@Component({
	moduleId: module.id,
	selector: 'game-dice-roller',
	templateUrl: 'tmpl/game-dice-roller.html',
	styleUrls: ['styles/game-dice-roller.css']
})
export class GameDiceRollerComponent {

	@Output()
	public gameDiceRoll = new EventEmitter<GameDiceRoll>();

	constructor() {}

	public rollDice(): void {
		const left = Math.ceil(Math.random() * 6) + 1;
		const right = Math.ceil(Math.random() * 6) + 1;

		this.gameDiceRoll.emit(left + right);
	}
}
