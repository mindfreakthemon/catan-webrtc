import { GameRoad } from './game-road';
import { GameFieldCellSide } from './game-field-cell-side';

export class GameFieldCellRoadHolder {
	public road?: GameRoad;

	public connections: number = 0;

	public connected: GameFieldCellSide[] = [];
}
