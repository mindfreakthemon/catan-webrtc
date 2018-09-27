import { GameFieldCellSidePosition } from '../enums/game-field-cell-side-position.enum';
import { GameFieldCellRoadHolder } from './game-field-cell-road-holder';
import { GameFieldCellHouseHolder } from './game-field-cell-house-holder';

export class GameFieldCellSide {

	constructor(
		public sidePosition: GameFieldCellSidePosition,
		public leftHouse: GameFieldCellHouseHolder,
		public road: GameFieldCellRoadHolder,
		public rightHouse: GameFieldCellHouseHolder
	) {
	}
}
