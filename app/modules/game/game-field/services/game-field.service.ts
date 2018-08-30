import { Injectable } from '@angular/core';
import { HexMap } from '../models/hex-map';

@Injectable()
export class GameFieldService {

	generateField(): HexMap {
		return new HexMap(7);
	}
}
