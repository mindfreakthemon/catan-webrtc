import { GameHouse } from './game-house';
import { GameFieldCellSide } from './game-field-cell-side';

export class GameFieldCellHouseHolder {
	public house?: GameHouse;

	public connections: number = 0;

	public connectedLeft: GameFieldCellSide[] = [];
	public connectedRight: GameFieldCellSide[] = [];
}
