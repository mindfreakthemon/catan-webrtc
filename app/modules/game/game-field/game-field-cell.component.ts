import { Component, HostBinding, Input } from '@angular/core';
import { GameFieldCell } from './models/game-field-cell';

@Component({
	moduleId: module.id,
	selector: 'game-field-cell',
	templateUrl: 'tmpl/game-field-cell.html',
	styleUrls: ['styles/game-field-cell.css']
})
export class GameFieldCellComponent {

	@Input()
	cell: GameFieldCell;

	@Input()
	sizeCoefficient: number = 2;

	@HostBinding('style.width.px')
	private get width(): number {
		return 38 * this.sizeCoefficient;
	}

	@HostBinding('style.height.px')
	private get height(): number {
		return 33 * this.sizeCoefficient;
	}

	// @HostBinding('style.margin.px')
	// private get margin(): number {
	// 	return -3.75 * this.sizeCoefficient;
	// }
}
