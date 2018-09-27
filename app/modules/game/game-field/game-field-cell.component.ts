import { Component, HostBinding, Input } from '@angular/core';
import { GameFieldCell } from './models/game-field-cell';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

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

	private get size(): number {
		return 20;
	}

	@HostBinding('style.width.px')
	private get width(): number {
		return Math.sqrt(3) * this.size * this.sizeCoefficient;
	}

	@HostBinding('style.height.px')
	private get height(): number {
		return 2 * this.size * this.sizeCoefficient;
	}

	@HostBinding('style.margin-top.px')
	private get margin(): number {
		return -1 * (this.size / 2.1) * this.sizeCoefficient;
	}

	private get typeImage(): SafeStyle {
		return this.sanitizer.bypassSecurityTrustStyle(`url(${this.cell.type})`);
	}

	constructor(private sanitizer: DomSanitizer) {

	}


}
