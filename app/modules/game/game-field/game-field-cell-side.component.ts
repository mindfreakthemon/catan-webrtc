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
		[-30, -15, 0],
		[30, 3, 0],
		[-90, -10, -20],
		[90, 5, -10],
		[-150, 4, -18],
		[150, 2, -8]
	];

	private translateXOrigin: number = 14;

	private translateYOrigin: number = -5;

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
		const translateXOrigin = this.translateXOrigin * this.sizeCoefficient;
		const translateYOrigin = this.translateYOrigin * this.sizeCoefficient;

		return this.sanitizer.bypassSecurityTrustStyle(
			`translate(${translateXOrigin}px, ${translateYOrigin}px) rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`);
	}

	@HostBinding('style.background-color')
	private get color(): string {
		return this.cellSide.color;
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
		return this.cellSide.connections === 0;
	}

	@HostBinding('class.has-connections')
	private get hasConnections(): boolean {
		return this.cellSide.connections > 0;
	}

	constructor(private sanitizer: DomSanitizer) {

	}
}
