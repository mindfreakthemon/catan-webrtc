import { GameFieldCell, GameFieldCellHolder, GameFieldCellSide } from './game-field-cell';
import { GameFieldCellSidePosition } from '../enums/game-field-cell-side-position.enum';

export class HexMapRow {
	constructor(
		private readonly hexMap: HexMap,
		private readonly i: number
	) {
	}

	* [Symbol.iterator]() {
		const r = this.i;
		const last = this.hexMap.size - Math.max(0, r - this.hexMap.radius);

		for (let q = Math.max(0, this.hexMap.radius - r); q < last; q++) {
			yield this.hexMap.storage[r][q];
		}
	}
}

export interface HexMapIndex {
	r: number;
	q: number;
	a: number;
}

export class HexMap {

	storage: GameFieldCell[][];

	radius: number;

	constructor(public readonly size: number) {

		this.radius = Math.floor(size / 2);

		this.storage = Array(size);

		for (let i = 0; i < size; i++) {
			this.storage[i] = Array(size);

			for (let j = 0; j < size; j++) {
				this.storage[i][j] = this.createField();
			}
		}

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				let { r, a } = this.getIndex(i, j);


				if (a >  this.radius) {
					continue;
				}

				// if (i) {
				// 	this.connect(this.storage[i - 1][j], this.storage[i][j], GameFieldCellSidePosition.TOP);
				//
				// 	if (j) {
				// 		this.connect(this.storage[i - 1][j - 1], this.storage[i][j], GameFieldCellSidePosition.TOP_LEFT);
				// 	}
				//
				// 	if (j < size - 1) {
				// 		this.connect(this.storage[i - 1][j + 1], this.storage[i][j], GameFieldCellSidePosition.TOP_RIGHT);
				// 	}
				// }
				//
				// if (j) {
				// 	this.connect(this.storage[i - 1][j - 1], this.storage[i][j], GameFieldCellSidePosition.BOTTOM);
				// }
				//
				// if (j < size - 1) {
				// 	this.connect(this.storage[i - 1][j + 1], this.storage[i][j], GameFieldCellSidePosition.TOP_RIGHT);
				// }
			}
		}
	}

	public get(r: number, q: number): GameFieldCell {
		return this.storage[r + this.size][q + this.size + Math.min(0, r)];
	}

	public getStorageCoordinates(r: number, q: number): any {
		return {
			i: r,
			j: q - Math.max(0, this.size - r)
		};
	}

	public getOffsetCoordinates(i: number, j: number): any {
		return {
			q: j,
			r: i
		};
	}

	public getIndex(i: number, j: number): HexMapIndex {
		let r = i - this.radius;
		let q = j - this.radius;

		return { r, q, a: Math.abs(r + q) };
	}

	* [Symbol.iterator]() {
		for (let r = 0; r < this.size; r++) {
			yield new HexMapRow(this, r);
		}
	}

	private createField(): GameFieldCell {
		const topLeftRoad = new GameFieldCellHolder();
		const topRightRoad = new GameFieldCellHolder();

		const leftRoad = new GameFieldCellHolder();
		const rightRoad = new GameFieldCellHolder();

		const rightBottomRoad = new GameFieldCellHolder();
		const bottomLeftRoad = new GameFieldCellHolder();

		const topHouse = new GameFieldCellHolder();
		const topLeftHouse = new GameFieldCellHolder();
		const topRightHouse = new GameFieldCellHolder();
		const bottomLeftHouse = new GameFieldCellHolder();
		const bottomRightHouse = new GameFieldCellHolder();
		const bottomHouse = new GameFieldCellHolder();

		const topLeftSide = new GameFieldCellSide(topLeftHouse, topLeftRoad, topHouse);
		const topRightSide = new GameFieldCellSide(topHouse, topRightRoad, topRightHouse);

		const leftSide = new GameFieldCellSide(bottomLeftHouse, leftRoad, topLeftHouse);
		const rightSide = new GameFieldCellSide(topRightHouse, rightRoad, bottomRightHouse);

		const bottomLeftSide = new GameFieldCellSide(bottomHouse, bottomLeftRoad, bottomLeftHouse);
		const bottomRightSide = new GameFieldCellSide(bottomRightHouse, rightBottomRoad, bottomHouse);

		return new GameFieldCell(topLeftSide, topRightSide, leftSide, rightSide, bottomLeftSide, bottomRightSide);
	}

	/**
	 *
	 * @param gameFieldCellA - Gets overwritten by values of gameFieldCellB
	 * @param gameFieldCellB - Gets copied from to gameFieldCellA
	 * @param position - Where to join
	 */
	private connect(gameFieldCellA: GameFieldCell, gameFieldCellB: GameFieldCell, position: GameFieldCellSidePosition): void {

		switch (position) {
			case GameFieldCellSidePosition.TOP_LEFT:
				gameFieldCellA.topLeft.leftHouse = gameFieldCellB.bottomRight.rightHouse;
				gameFieldCellA.topLeft.road = gameFieldCellB.bottomRight.road;
				gameFieldCellA.topLeft.rightHouse = gameFieldCellB.bottomRight.leftHouse;
				break;

			case GameFieldCellSidePosition.TOP:
				gameFieldCellA.left.leftHouse = gameFieldCellB.right.rightHouse;
				gameFieldCellA.left.road = gameFieldCellB.right.road;
				gameFieldCellA.left.rightHouse = gameFieldCellB.right.leftHouse;
				break;

			case GameFieldCellSidePosition.TOP_RIGHT:
				gameFieldCellA.topRight.leftHouse = gameFieldCellB.bottomLeft.rightHouse;
				gameFieldCellA.topRight.road = gameFieldCellB.bottomLeft.road;
				gameFieldCellA.topRight.rightHouse = gameFieldCellB.bottomLeft.leftHouse;
				break;


			case GameFieldCellSidePosition.BOTTOM_LEFT:
				gameFieldCellA.bottomLeft.leftHouse = gameFieldCellB.topRight.rightHouse;
				gameFieldCellA.bottomLeft.road = gameFieldCellB.topRight.road;
				gameFieldCellA.bottomLeft.rightHouse = gameFieldCellB.topRight.leftHouse;
				break;

			case GameFieldCellSidePosition.BOTTOM:
				gameFieldCellA.right.leftHouse = gameFieldCellB.left.rightHouse;
				gameFieldCellA.right.road = gameFieldCellB.left.road;
				gameFieldCellA.right.rightHouse = gameFieldCellB.left.leftHouse;
				break;

			case GameFieldCellSidePosition.BOTTOM_RIGHT:
				gameFieldCellA.topRight.leftHouse = gameFieldCellB.bottomRight.rightHouse;
				gameFieldCellA.topRight.road = gameFieldCellB.bottomRight.road;
				gameFieldCellA.topRight.rightHouse = gameFieldCellB.bottomRight.leftHouse;
				break;

		}
	}
}
