import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { GameNodeService } from '../game/services/game-node.service';
import { GameState } from '../game-scenario/enums/game-state.enum';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';
import { HexMap } from './models/hex-map';
import { GameFieldCell } from './models/game-field-cell';

@Component({
	moduleId: module.id,
	selector: 'game-cell',
	templateUrl: 'tmpl/game-cell.html',
	styleUrls: ['styles/game-cell.css']
})
export class GameCellComponent implements OnInit {

	GameState = GameState;

	@Input()
	gameNodeService: GameNodeService;

	@Input()
	cell: GameFieldCell;

	@Input()
	hexMap: HexMap;

	ngOnInit(): void {

	}
}
