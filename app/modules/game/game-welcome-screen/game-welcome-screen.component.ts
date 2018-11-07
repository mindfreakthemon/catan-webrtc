import { Component } from '@angular/core';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';

@Component({
	moduleId: module.id,
	selector: 'game-welcome-screen',
	templateUrl: 'tmpl/game-welcome-screen.html',
	styleUrls: ['styles/game-welcome-screen.css']
})
export class GameWelcomeScreenComponent {

	constructor(private gameScenarioService: GameScenarioService) {}
}
