import { Component, HostBinding, Input } from '@angular/core';
import { GameFieldCellHouseHolder } from './models/game-field-cell-house-holder';

@Component({
	moduleId: module.id,
	selector: 'game-field-cell-house',
	templateUrl: 'tmpl/game-field-cell-house.html',
	styleUrls: ['styles/game-field-cell-house.css']
})
export class GameFieldCellHouseComponent {

	@Input()
	house: GameFieldCellHouseHolder;

	@Input()
	sizeCoefficient: number = 2;

	@HostBinding('class.has-no-connections')
	private get hasNoConnections(): boolean {
		return this.house.connections === 0;
	}

	@HostBinding('class.has-connections')
	private get hasConnections(): boolean {
		return this.house.connections > 0;
	}
}
