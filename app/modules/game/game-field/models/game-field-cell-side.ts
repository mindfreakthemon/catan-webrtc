import { GameFieldCellSidePosition } from '../enums/game-field-cell-side-position.enum';
import { GameFieldCellRoadHolder } from './game-field-cell-road-holder';
import { GameFieldCellHouseHolder } from './game-field-cell-house-holder';

export class GameFieldCellSide {

	public connections: number = 0;

	public color: string = '#0f0';

	public random: string = '#0f0';

	constructor(
		public sidePosition: GameFieldCellSidePosition,
		public leftHouse: GameFieldCellHouseHolder,
		public road: GameFieldCellRoadHolder,
		public rightHouse: GameFieldCellHouseHolder
	) {
		const color = Math.floor((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0');

		this.color = `#${color}`;

		this.random = Math.floor(Math.random() * 100).toString(16);
	}
}
