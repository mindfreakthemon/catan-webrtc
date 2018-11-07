import { Component } from '@angular/core';
import { GameDiceRoll } from './models/game-dice-roll';
import { GameContextService } from '../game/services/game-context.service';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';

@Component({
	moduleId: module.id,
	selector: 'game-dice-roller-screen',
	templateUrl: 'tmpl/game-dice-roller-screen.html',
	styleUrls: ['styles/game-dice-roller-screen.css']
})
export class GameDiceRollerScreenComponent {

	private hasStartDiceRolled: boolean = false;

	constructor(
		private gameScenarioService: GameScenarioService,
		private gameContextService: GameContextService) {}

	public handleGameDiceRoll(gameDiceRoll: GameDiceRoll): void {
		this.gameContextService.getService().registerPlayerStartDiceRoll(gameDiceRoll)
			.then(() => {
				this.hasStartDiceRolled = true;
			});
	}

	public handleDone(): void {
		this.gameScenarioService.nextGameState();
	}
}
