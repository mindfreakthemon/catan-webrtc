import { Component, Input } from '@angular/core';
import { GameFieldService } from './services/game-field.service';

@Component({
	moduleId: module.id,
	selector: 'game-field',
	templateUrl: 'tmpl/game-field.html',
	styleUrls: ['styles/game-field.css']
})
export class GameFieldComponent {

	@Input()
	sizeCoefficient: number = 2;

	constructor(public gameFieldService: GameFieldService) {
	}
}
