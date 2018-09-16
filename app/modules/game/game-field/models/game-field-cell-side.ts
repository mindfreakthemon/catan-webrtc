import { GameFieldCellSidePosition } from '../enums/game-field-cell-side-position.enum';
import { GameFieldCellHolder } from './game-field-cell-holder';

export class GameFieldCellSide {

	public count: number = 1;

	public color: string = '#0f0';

	constructor(
		public sidePosition: GameFieldCellSidePosition,
		public leftHouse: GameFieldCellHolder,
		public road: GameFieldCellHolder,
		public rightHouse: GameFieldCellHolder
	) {
		const color = Math.floor((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0');

		this.color = `#${color}`;
	}
}
