import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { GameNodeService } from '../game/services/game-node.service';
import { GameState } from '../game-scenario/enums/game-state.enum';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';
import { HexMap } from './models/hex-map';

@Component({
	moduleId: module.id,
	selector: 'game-field',
	templateUrl: 'tmpl/game-field.html',
	styleUrls: ['styles/game-field.css']
})
export class GameFieldComponent implements OnInit {

	GameState = GameState;

	@Input()
	gameNodeService: GameNodeService;

	@Input()
	peerType: PeerType;

	@Input()
	hexMap: HexMap;

	ngOnInit(): void {

	}
}
