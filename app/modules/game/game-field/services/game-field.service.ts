import { GameFieldCell } from '../models/game-field-cell';
import { GameFieldCellSidePosition } from '../enums/game-field-cell-side-position.enum';
import { GameFieldCellSide } from '../models/game-field-cell-side';
import { GameFieldCellRoadHolder } from '../models/game-field-cell-road-holder';
import { Inject, Injectable } from '@angular/core';
import { GameFieldConfiguration } from '../models/game-field-configuration';
import { GAME_FIELD_CONFIGURATION } from '../../game.config';
import { GameFieldCellHouseHolder } from '../models/game-field-cell-house-holder';
import { GameFieldCellType } from '../enums/game-field-cell-type.enum';

interface GameFieldIteratorIndex {
	firstRow: number;
	lastRow: number;
	firstColumn: number;
	lastColumn: number;
	r: number;
	q: number;
}

@Injectable()
export class GameFieldService {

	public storage: GameFieldCell[][];

	constructor(
		@Inject(GAME_FIELD_CONFIGURATION) public configuration: GameFieldConfiguration) {
		const size = configuration.size;

		this.storage = Array(size);

		for (let i = 0; i < size; i++) {
			this.storage[i] = Array(size);

			for (let j = 0; j < size; j++) {
				this.storage[i][j] = this.createFieldCell(i, j);
			}
		}

		this.forEach((cell: GameFieldCell, index: GameFieldIteratorIndex) => this.connect(cell, index));

		this.generateTypes();
	}

	public getRQ(r: number, q: number): GameFieldCell {
		return this.storage[this.getI(r, q)][this.getJ(r, q)];
	}

	public getIJ(i: number, j: number): GameFieldCell {
		return this.storage[i][j];
	}

	public getR(i: number, j: number): number {
		return i + this.firstRow();
	}

	public getQ(i: number, j: number): number {
		return j + this.firstColumn(this.getR(i, j));
	}

	public getI(r: number, q: number): number {
		return r - this.firstRow();
	}

	public getJ(r: number, q: number): number {
		return q - this.firstColumn(r);
	}

	public firstRow(): number {
		return 0;
	}

	public firstColumn(r: number): number {
		return Math.max(0, Math.floor(this.configuration.size / 2) - r);
	}

	public lastColumn(r: number): number {
		return this.configuration.size -  Math.max(0, r - Math.floor(this.configuration.size / 2));
	}

	public get length(): number {
		return 3 * Math.ceil(this.configuration.size / 2) * (Math.ceil(this.configuration.size / 2) - 1) + 1;
	}

	public generateTypes(): void {
		const length = this.length;

		const types: GameFieldCellType[] = Array(length);

		const amountOfTypes = 5;
		const amountOfDeserts = length % amountOfTypes;
		const amountOfOtherTypes = Math.floor(length / amountOfTypes);

		types.fill(GameFieldCellType.DESERT, 0, amountOfDeserts);

		[
			GameFieldCellType.CLAY,
			GameFieldCellType.ROCK,
			GameFieldCellType.SHEEP,
			GameFieldCellType.WHEAT,
			GameFieldCellType.WOOD
		].forEach((type: GameFieldCellType, index: number) => {
			const start = amountOfDeserts + index * amountOfOtherTypes;

			types.fill(type, start, start + amountOfOtherTypes);
		});

		for (let i = types.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));

			[types[i], types[j]] = [types[j], types[i]];
		}

		this.forEach((cell: GameFieldCell, index: GameFieldIteratorIndex) => cell.type = types.shift());

	}

	public forEach(fn: (cell: GameFieldCell, index: GameFieldIteratorIndex) => void): void {

		const firstRow = this.firstRow();
		const lastRow = this.configuration.size;

		for (let r = firstRow; r < lastRow; r++) {
			const firstColumn = this.firstColumn(r);
			const lastColumn = this.lastColumn(r);

			for (let q = firstColumn; q < lastColumn; q++) {
				const cell = this.getRQ(r, q);

				fn(cell, { firstRow, lastRow, firstColumn, lastColumn, r, q });
			}
		}
	}

	* [Symbol.iterator]() {
		const self = this;
		const size = this.configuration.size;

		for (let r = this.firstRow(); r < size; r++) {

			yield new class {
				* [Symbol.iterator]() {
					const last = self.lastColumn(r);

					for (let q = self.firstColumn(r); q < last; q++) {
						yield self.getRQ(r, q);
					}
				}
			}();
		}
	}

	private createFieldCell(i: number, j: number): GameFieldCell {
		const topLeftRoad = new GameFieldCellRoadHolder();
		const topRightRoad = new GameFieldCellRoadHolder();

		const leftRoad = new GameFieldCellRoadHolder();
		const rightRoad = new GameFieldCellRoadHolder();

		const rightBottomRoad = new GameFieldCellRoadHolder();
		const bottomLeftRoad = new GameFieldCellRoadHolder();

		const topHouse = new GameFieldCellHouseHolder();
		const topLeftHouse = new GameFieldCellHouseHolder();
		const topRightHouse = new GameFieldCellHouseHolder();
		const bottomLeftHouse = new GameFieldCellHouseHolder();
		const bottomRightHouse = new GameFieldCellHouseHolder();
		const bottomHouse = new GameFieldCellHouseHolder();

		const topLeftSide = new GameFieldCellSide(GameFieldCellSidePosition.TOP_LEFT, topLeftHouse, topLeftRoad, topHouse);
		const topRightSide = new GameFieldCellSide(GameFieldCellSidePosition.TOP_RIGHT, topHouse, topRightRoad, topRightHouse);

		const leftSide = new GameFieldCellSide(GameFieldCellSidePosition.LEFT, bottomLeftHouse, leftRoad, topLeftHouse);
		const rightSide = new GameFieldCellSide(GameFieldCellSidePosition.RIGHT, topRightHouse, rightRoad, bottomRightHouse);

		const bottomLeftSide = new GameFieldCellSide(GameFieldCellSidePosition.BOTTOM_LEFT, bottomHouse, bottomLeftRoad, bottomLeftHouse);
		const bottomRightSide = new GameFieldCellSide(GameFieldCellSidePosition.BOTTOM_RIGHT, bottomRightHouse, rightBottomRoad, bottomHouse);

		return new GameFieldCell(
			this.getR(i, j), this.getQ(i, j), topLeftSide, topRightSide, leftSide, rightSide, bottomLeftSide, bottomRightSide);
	}

	private connect(cell: GameFieldCell, index: GameFieldIteratorIndex): void {
		const { r, q, firstColumn, lastColumn, firstRow, lastRow } = index;

		const lastColumnPrev = this.lastColumn(r - 1);
		const firstColumnPrev = this.firstColumn(r - 1);

		const lastColumnNext = this.lastColumn(r + 1);
		const firstColumnNext = this.firstColumn(r + 1);

		/**
		 * Connect Roads
		 */
		if (r > firstRow && q >= firstColumnPrev && q < lastColumnPrev) {
			const topLeftCell = this.getRQ(r - 1, q);

			this.copyRoad(topLeftCell.bottomRight, cell.topLeft);
		}

		if ((r + 1) < lastRow && (q - 1) >= firstColumnNext && (q - 1) < lastColumnNext) {
			const bottomLeftCell = this.getRQ(r + 1, q - 1);

			this.copyRoad(bottomLeftCell.topRight, cell.bottomLeft);
		}

		if ((q - 1) >= firstColumn && (q - 1) < lastColumn) {
			const leftCell = this.getRQ(r, q - 1);

			this.copyRoad(leftCell.right, cell.left);
		}

		/**
		 * Connect Houses
		 */
		// middle top
		if (q > firstColumn) {
			const house = new GameFieldCellHouseHolder();

			const leftCell = this.getRQ(r, q - 1);

			cell.topLeft.leftHouse = house;
			cell.left.rightHouse = house;
			leftCell.topRight.rightHouse = house;
			leftCell.right.leftHouse = house;

			if (r > firstRow) {
				const topLeftCell = this.getRQ(r - 1, q);

				topLeftCell.bottomRight.rightHouse = house;
				topLeftCell.bottomLeft.leftHouse = house;
			}

			house.connections++;
		}

		// middle bottom
		if (q > firstColumn) {
			const house = new GameFieldCellHouseHolder();

			const leftCell = this.getRQ(r, q - 1);

			cell.bottomLeft.rightHouse = house;
			cell.left.leftHouse = house;
			leftCell.bottomRight.leftHouse = house;
			leftCell.right.rightHouse = house;

			if ((r + 1) < lastRow) {
				const bottomLeftCell = this.getRQ(r + 1, q - 1);

				bottomLeftCell.topRight.leftHouse = house;
				bottomLeftCell.topLeft.rightHouse = house;
			}

			house.connections++;
		}

		// boundary left top
		if (q === firstColumn && (q - 1) === firstColumnNext) {
			const house = new GameFieldCellHouseHolder();

			const bottomLeftCell = this.getRQ(r + 1, q - 1);

			cell.bottomLeft.rightHouse = house;
			cell.left.leftHouse = house;
			bottomLeftCell.topRight.leftHouse = house;
			bottomLeftCell.topLeft.rightHouse = house;

			house.connections++;
		}

		// boundary left bottom
		if ((r + 1) < lastRow && q === firstColumn && q === firstColumnNext) {
			const house = new GameFieldCellHouseHolder();

			const bottomRightCell = this.getRQ(r + 1, q);

			cell.bottomRight.rightHouse = house;
			cell.bottomLeft.leftHouse = house;
			bottomRightCell.topLeft.leftHouse = house;
			bottomRightCell.left.rightHouse = house;

			house.connections++;
		}

		// boundary right top
		if ((q + 1) === lastColumn && (q + 1) === lastColumnNext) {
			const house = new GameFieldCellHouseHolder();

			const bottomRightCell = this.getRQ(r + 1, q);

			cell.bottomRight.leftHouse = house;
			cell.right.rightHouse = house;
			bottomRightCell.topRight.leftHouse = house;
			bottomRightCell.topLeft.rightHouse = house;

			house.connections++;
		}

		// boundary right bottom
		if ((r + 1) < lastRow && (q + 1) === lastColumn && q === lastColumnNext) {
			const house = new GameFieldCellHouseHolder();

			const bottomLeftCell = this.getRQ(r + 1, q - 1);

			cell.bottomRight.rightHouse  = house;
			cell.bottomLeft.leftHouse = house;
			bottomLeftCell.topRight.rightHouse = house;
			bottomLeftCell.right.leftHouse = house;

			house.connections++;
		}
	}

	private copyRoad(gameFieldCellSideA: GameFieldCellSide, gameFieldCellSideB: GameFieldCellSide): void {
		gameFieldCellSideA.road.random = gameFieldCellSideB.road.random;
		gameFieldCellSideA.road.color = gameFieldCellSideB.road.color;

		gameFieldCellSideA.road = gameFieldCellSideB.road;

		gameFieldCellSideA.road.connections++;
	}

	// private copyHouse(...houses: GameFieldCellHouseHolder[]): void {
	//
	// }
}
