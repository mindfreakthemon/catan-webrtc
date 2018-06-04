import { Injectable } from '@angular/core';
import { HexMap } from '../models/hex-map';

@Injectable()
export class GameFieldService {

	generateField(): HexMap {
		return new HexMap(7);
	}

	// generateField(): void {
	//
	//
	// 	let fieldCell = this.createField();
	//
	// 	let fieldCell1 = this.createField();
	// 	let fieldCell2 = this.createField();
	// 	let fieldCell3 = this.createField();
	// 	let fieldCell4 = this.createField();
	// 	let fieldCell5 = this.createField();
	// 	let fieldCell6 = this.createField();
	//
	//
	// 	this.connect(fieldCell1, fieldCell, GameFieldCellSidePosition.BOTTOM);
	// 	this.connect(fieldCell2, fieldCell, GameFieldCellSidePosition.BOTTOM_LEFT);
	// 	this.connect(fieldCell3, fieldCell, GameFieldCellSidePosition.TOP_LEFT);
	// 	this.connect(fieldCell4, fieldCell, GameFieldCellSidePosition.TOP);
	// 	this.connect(fieldCell5, fieldCell, GameFieldCellSidePosition.TOP_RIGHT);
	// 	this.connect(fieldCell6, fieldCell, GameFieldCellSidePosition.BOTTOM_RIGHT);
	//
	// 	this.connect(fieldCell1, fieldCell2, GameFieldCellSidePosition.BOTTOM_RIGHT);
	// 	this.connect(fieldCell2, fieldCell3, GameFieldCellSidePosition.BOTTOM);
	// 	this.connect(fieldCell3, fieldCell4, GameFieldCellSidePosition.BOTTOM_LEFT);
	// 	this.connect(fieldCell4, fieldCell5, GameFieldCellSidePosition.TOP_LEFT);
	// 	this.connect(fieldCell5, fieldCell6, GameFieldCellSidePosition.TOP);
	// 	this.connect(fieldCell6, fieldCell1, GameFieldCellSidePosition.TOP_RIGHT);
	//
	// }
	//
	//

}
