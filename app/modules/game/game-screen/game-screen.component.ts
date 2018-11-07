import { Component, Input } from '@angular/core';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';
import { GameState } from '../game-scenario/enums/game-state.enum';
import { GameNodeService } from '../game/services/game-node.service';

@Component({
	moduleId: module.id,
	selector: 'game-screen',
	templateUrl: 'tmpl/game-screen.html',
	styleUrls: ['styles/game-screen.css']
})
export class GameScreenComponent {

	GameState: typeof GameState = GameState;

	@Input()
	gameNodeService: GameNodeService;

	constructor(private gameScenarioService: GameScenarioService) {}
}
