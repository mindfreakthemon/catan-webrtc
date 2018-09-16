import { Component, HostBinding, Input } from '@angular/core';
import { GameNodeService } from '../game/services/game-node.service';
import { GameFieldCellSide } from './models/game-field-cell-side';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'game-cell-side',
	templateUrl: 'tmpl/game-cell-side.html',
	styleUrls: ['styles/game-cell-side.css']
})
export class GameCellSideComponent {

	@Input()
	gameNodeService: GameNodeService;

	@Input()
	cellSide: GameFieldCellSide;

	@Input()
	sizeCoefficient: number = 2;

	private transformMatrix: number[][] = [
		[-30, -15, 0],
		[30, 3, 0],
		[-90, -10, -20],
		[90, 5, -10],
		[-150, 4, -18],
		[150, 2, -8]
	];

	@HostBinding('style.width.px')
	private get width(): number {
		return 20 * this.sizeCoefficient;
	}

	@HostBinding('style.height.px')
	private get height(): number {
		return 5 * this.sizeCoefficient;
	}

	@HostBinding('style.transform')
	private get transform(): SafeStyle {
		const position = this.cellSide.sidePosition;
		const rotate = this.transformMatrix[position][0];
		const translateX = this.transformMatrix[position][1] * this.sizeCoefficient;
		const translateY = this.transformMatrix[position][2] * this.sizeCoefficient;

		return this.sanitizer.bypassSecurityTrustStyle(`rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`);
	}

	@HostBinding('style.background-color')
	private get color(): string {
		return this.cellSide.color;
	}

	constructor(private sanitizer: DomSanitizer) {

	}
}
