import { GameFieldCellType } from '../enums/game-field-cell-type.enum';

export class GameFieldCellHolder {
	item: any;
}

export class GameFieldCellSide {
	constructor(
		public leftHouse: GameFieldCellHolder,
		public road: GameFieldCellHolder,
		public rightHouse: GameFieldCellHolder
	) {}
}

export class GameFieldCell {
	type?: GameFieldCellType;

	constructor(
		public topLeft: GameFieldCellSide,
		public topRight: GameFieldCellSide,
		public left: GameFieldCellSide,
		public right: GameFieldCellSide,
		public bottomLeft: GameFieldCellSide,
		public bottomRight: GameFieldCellSide
	) {}
}
