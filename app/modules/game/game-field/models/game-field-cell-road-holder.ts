import { GameRoad } from './game-road';

export class GameFieldCellRoadHolder {
	public road?: GameRoad;

	public connections: number = 0;

	public color: string = '#0f0';

	public random: string = '#0f0';

	constructor() {
		const color = Math.floor((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0');

		this.color = `#${color}`;

		this.random = Math.floor(Math.random() * 100).toString(16);
	}
}
