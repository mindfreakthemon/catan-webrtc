import { Component, HostBinding, Input } from '@angular/core';
import { GameNodeService } from '../game/services/game-node.service';
import { HexMap } from './models/hex-map';
import { GameFieldCell } from './models/game-field-cell';

@Component({
	moduleId: module.id,
	selector: 'game-cell',
	templateUrl: 'tmpl/game-cell.html',
	styleUrls: ['styles/game-cell.css']
})
export class GameCellComponent {

	@Input()
	gameNodeService: GameNodeService;

	@Input()
	cell: GameFieldCell;

	@Input()
	hexMap: HexMap;

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
}
