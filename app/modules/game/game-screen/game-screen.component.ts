import { Component } from '@angular/core';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';

@Component({
	moduleId: module.id,
	selector: 'game-screen',
	templateUrl: 'tmpl/game-screen.html',
	styleUrls: ['styles/game-screen.css']
})
export class GameScreenComponent {

	constructor(private gameScenarioService: GameScenarioService) {}
}
