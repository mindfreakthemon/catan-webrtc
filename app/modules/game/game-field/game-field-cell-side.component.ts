import { Component, HostBinding, Input } from '@angular/core';
import { GameFieldCellSide } from './models/game-field-cell-side';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { GameFieldCellSidePosition } from './enums/game-field-cell-side-position.enum';

@Component({
	moduleId: module.id,
	selector: 'game-field-cell-side',
	templateUrl: 'tmpl/game-field-cell-side.html',
	styleUrls: ['styles/game-field-cell-side.css']
})
export class GameFieldCellSideComponent {

	@Input()
	cellSide: GameFieldCellSide;

	@Input()
	sizeCoefficient: number = 2;

	private transformMatrix: number[][] = [
		[-30, -2.5, 2],
		[30, 15, -6],
		[-90, -70 / 4, -9],
		[90,  70 / 4, -96 / 4],
		[-150, -15, -29],
		[150, 2, -144 / 4]
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

		return this.sanitizer.bypassSecurityTrustStyle(
			`rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`);
	}

	@HostBinding('class.top-left')
	private get isTopLeft(): boolean {
		return this.cellSide.sidePosition === GameFieldCellSidePosition.TOP_LEFT;
	}

	@HostBinding('class.top-right')
	private get isTopRight(): boolean {
		return this.cellSide.sidePosition === GameFieldCellSidePosition.TOP_RIGHT;
	}

	@HostBinding('class.left')
	private get isLeft(): boolean {
		return this.cellSide.sidePosition === GameFieldCellSidePosition.LEFT;
	}

	@HostBinding('class.right')
	private get isRight(): boolean {
		return this.cellSide.sidePosition === GameFieldCellSidePosition.RIGHT;
	}

	@HostBinding('class.bottom-left')
	private get isBottomLeft(): boolean {
		return this.cellSide.sidePosition === GameFieldCellSidePosition.BOTTOM_LEFT;
	}

	@HostBinding('class.bottom-right')
	private get isBottomRight(): boolean {
		return this.cellSide.sidePosition === GameFieldCellSidePosition.BOTTOM_RIGHT;
	}

	@HostBinding('class.has-no-connections')
	private get hasNoConnections(): boolean {
		return this.cellSide.road.connections === 0;
	}

	@HostBinding('class.has-connections')
	private get hasConnections(): boolean {
		return this.cellSide.road.connections > 0;
	}

	constructor(private sanitizer: DomSanitizer) {

	}
}
