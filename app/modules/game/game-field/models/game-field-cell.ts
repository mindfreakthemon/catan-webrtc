import { GameFieldCellType } from '../enums/game-field-cell-type.enum';
import { GameFieldCellSide } from './game-field-cell-side';

export class GameFieldCell {
	public type?: GameFieldCellType;

	constructor(
		public r: number,
		public q: number,

		public topLeft: GameFieldCellSide,
		public topRight: GameFieldCellSide,
		public left: GameFieldCellSide,
		public right: GameFieldCellSide,
		public bottomLeft: GameFieldCellSide,
		public bottomRight: GameFieldCellSide
	) {}
}
