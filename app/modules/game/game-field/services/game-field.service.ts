import { GameFieldCell } from '../models/game-field-cell';
import { GameFieldCellSidePosition } from '../enums/game-field-cell-side-position.enum';
import { GameFieldCellSide } from '../models/game-field-cell-side';
import { GameFieldCellRoadHolder } from '../models/game-field-cell-road-holder';
import { Inject, Injectable } from '@angular/core';
import { GameFieldConfiguration } from '../models/game-field-configuration';
import { GAME_FIELD_CONFIGURATION } from '../../game.config';
import { GameFieldCellHouseHolder } from '../models/game-field-cell-house-holder';

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

		const firstRow = this.firstRow();
		const lastRow = size;

		for (let r = firstRow; r < lastRow; r++) {
			const firstColumn = this.firstColumn(r);
			const lastColumn = this.lastColumn(r);

			for (let q = firstColumn; q < lastColumn; q++) {
				const cell = this.getRQ(r, q);

				const lastColumnPrev = this.lastColumn(r - 1);
				const firstColumnPrev = this.firstColumn(r - 1);

				const lastColumnNext = this.lastColumn(r + 1);
				const firstColumnNext = this.firstColumn(r + 1);

				if (r > firstRow && q >= firstColumnPrev && q < lastColumnPrev) {
					this.connect(this.getRQ(r - 1, q), cell, GameFieldCellSidePosition.TOP_LEFT);
				}

				if ((r + 1) < lastRow && (q - 1) >= firstColumnNext && (q - 1) < lastColumnNext) {
					this.connect(this.getRQ(r + 1, q - 1), cell, GameFieldCellSidePosition.BOTTOM_LEFT);
				}

				if ((q - 1) >= firstColumn && (q - 1) < lastColumn) {
					this.connect(this.getRQ(r, q - 1), cell, GameFieldCellSidePosition.LEFT);
				}

			}
		}
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
		return j;
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

		topHouse.connectedLeft.push(topRightSide);
		topHouse.connectedRight.push(topLeftSide);

		topLeftHouse.connectedLeft.push(topLeftSide);
		topLeftHouse.connectedRight.push(leftSide);

		topRightHouse.connectedLeft.push(topRightSide);
		topRightHouse.connectedRight.push(rightSide);

		bottomLeftHouse.connectedLeft.push(leftSide);
		bottomLeftHouse.connectedRight.push(bottomLeftSide);

		bottomRightHouse.connectedLeft.push(bottomRightSide);
		bottomRightHouse.connectedRight.push(rightSide);

		bottomHouse.connectedLeft.push(bottomLeftSide);
		bottomHouse.connectedRight.push(bottomRightSide);

		const q = this.getQ(i, j);
		const r = this.getR(i, j);

		return new GameFieldCell(i, j, r, q, topLeftSide, topRightSide, leftSide, rightSide, bottomLeftSide, bottomRightSide);
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
				this.copy(gameFieldCellA.bottomRight, gameFieldCellB.topLeft);
				break;

			case GameFieldCellSidePosition.BOTTOM_LEFT:
				this.copy(gameFieldCellA.topRight, gameFieldCellB.bottomLeft);
				break;

			case GameFieldCellSidePosition.LEFT:
				this.copy(gameFieldCellA.right, gameFieldCellB.left);
				break;

			case GameFieldCellSidePosition.RIGHT:
			case GameFieldCellSidePosition.BOTTOM_RIGHT:
			case GameFieldCellSidePosition.TOP_RIGHT:
				// not necessary
				break;

		}
	}

	private copy(gameFieldCellSideA: GameFieldCellSide, gameFieldCellSideB: GameFieldCellSide): void {
		gameFieldCellSideA.random = gameFieldCellSideB.random;
		gameFieldCellSideA.color = gameFieldCellSideB.color;

		for (let gameFieldCellSide of gameFieldCellSideA.leftHouse.connectedLeft) {
			gameFieldCellSide.leftHouse = gameFieldCellSideB.leftHouse;
		}

		gameFieldCellSideB.leftHouse.connectedLeft.push(...gameFieldCellSideA.leftHouse.connectedLeft);

		for (let gameFieldCellSide of gameFieldCellSideA.leftHouse.connectedRight) {
			gameFieldCellSide.rightHouse = gameFieldCellSideB.leftHouse;
		}

		gameFieldCellSideB.leftHouse.connectedLeft.push(...gameFieldCellSideA.leftHouse.connectedRight);

		gameFieldCellSideB.leftHouse.connections++;

		for (let gameFieldCellSide of gameFieldCellSideA.road.connected) {
			gameFieldCellSide.road = gameFieldCellSideB.road;
		}

		gameFieldCellSideA.road = gameFieldCellSideB.road;

		gameFieldCellSideA.road.connections++;

		for (let gameFieldCellSide of gameFieldCellSideA.rightHouse.connectedLeft) {
			gameFieldCellSide.leftHouse = gameFieldCellSideB.rightHouse;

		}

		gameFieldCellSideB.rightHouse.connectedLeft.push(...gameFieldCellSideA.rightHouse.connectedLeft);

		for (let gameFieldCellSide of gameFieldCellSideA.rightHouse.connectedRight) {
			gameFieldCellSide.rightHouse = gameFieldCellSideB.rightHouse;
		}

		gameFieldCellSideB.rightHouse.connectedRight.push(...gameFieldCellSideA.rightHouse.connectedRight);


		gameFieldCellSideB.rightHouse.connections++;

		gameFieldCellSideA.connections++;
		gameFieldCellSideB.connections++;
	}
}
