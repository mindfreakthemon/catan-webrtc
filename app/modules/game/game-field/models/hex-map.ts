import { GameFieldCell, GameFieldCellHolder, GameFieldCellSide } from './game-field-cell';
import { GameFieldCellSidePosition } from '../enums/game-field-cell-side-position.enum';

export class HexMapRow {
	constructor(
		public readonly size: number,
		public readonly radius: number,
		private readonly storage: GameFieldCell[][],
		private readonly i: number
	) {
	}

	* [Symbol.iterator]() {
		for (let j = 0; j < this.size; j++) {
			let r = this.i - this.radius;
			let q = j - this.radius;

			if (Math.abs(r + q) > this.radius) {
				continue;
			}

			yield this.storage[this.i][j];
		}
	}
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
				this.storage[i][j] = HexMap.createField();
			}
		}
	}

	get(r: number, q: number): GameFieldCell {
		return this.storage[r + this.size][q + this.size + Math.min(0, r)];
	}

	static createField(): GameFieldCell {
		const topRoad = new GameFieldCellHolder();
		const topRightRoad = new GameFieldCellHolder();
		const rightBottomRoad = new GameFieldCellHolder();
		const bottomRoad = new GameFieldCellHolder();
		const bottomLeftRoad = new GameFieldCellHolder();
		const topLeftRoad = new GameFieldCellHolder();

		const topLeftHouse = new GameFieldCellHolder();
		const topRightHouse = new GameFieldCellHolder();
		const rightHouse = new GameFieldCellHolder();
		const rightBottomHouse = new GameFieldCellHolder();
		const leftHouse = new GameFieldCellHolder();
		const leftBottomHouse = new GameFieldCellHolder();

		const topLeft = new GameFieldCellSide(leftBottomHouse, topLeftRoad, topLeftHouse);
		const top = new GameFieldCellSide(topLeftHouse, topRoad, topRightHouse);
		const topRight = new GameFieldCellSide(topRightHouse, topRightRoad, rightHouse);
		const bottomLeft = new GameFieldCellSide(leftHouse, bottomLeftRoad, leftBottomHouse);
		const bottom = new GameFieldCellSide(rightBottomHouse, bottomRoad, leftHouse);
		const bottomRight = new GameFieldCellSide(rightHouse, rightBottomRoad, rightBottomHouse);

		return new GameFieldCell(topLeft, top, topRight, bottomLeft, bottom, bottomRight);
	}

	static connect(gameFieldCellA: GameFieldCell, gameFieldCellB: GameFieldCell, position: GameFieldCellSidePosition) {

		switch (position) {
			case GameFieldCellSidePosition.TOP_LEFT:
				gameFieldCellA.topLeft.leftHouse = gameFieldCellB.bottomRight.rightHouse;
				gameFieldCellA.topLeft.road = gameFieldCellB.bottomRight.road;
				gameFieldCellA.topLeft.rightHouse = gameFieldCellB.bottomRight.leftHouse;
				break;

			case GameFieldCellSidePosition.TOP:
				gameFieldCellA.top.leftHouse = gameFieldCellB.bottom.rightHouse;
				gameFieldCellA.top.road = gameFieldCellB.bottom.road;
				gameFieldCellA.top.rightHouse = gameFieldCellB.bottom.leftHouse;
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
				gameFieldCellA.bottom.leftHouse = gameFieldCellB.top.rightHouse;
				gameFieldCellA.bottom.road = gameFieldCellB.top.road;
				gameFieldCellA.bottom.rightHouse = gameFieldCellB.top.leftHouse;
				break;

			case GameFieldCellSidePosition.BOTTOM_RIGHT:
				gameFieldCellA.topRight.leftHouse = gameFieldCellB.bottomRight.rightHouse;
				gameFieldCellA.topRight.road = gameFieldCellB.bottomRight.road;
				gameFieldCellA.topRight.rightHouse = gameFieldCellB.bottomRight.leftHouse;
				break;

		}
	}

	* [Symbol.iterator]() {
		for (let i = 0; i < this.size; i++) {
			yield new HexMapRow(this.size, this.radius, this.storage, i);
		}
	}
}
