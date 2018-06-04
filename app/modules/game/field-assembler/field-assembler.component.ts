import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { GameNodeService } from '../game/services/game-node.service';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';
import { GameEvent } from '../game/enums/game-event.enum';
import { GameFieldService} from '../game-field/services/game-field.service';
import { HexMap } from '../game-field/models/hex-map';

@Component({
	moduleId: module.id,
	selector: 'field-assembler',
	templateUrl: 'tmpl/field-assembler.html',
	styleUrls: ['styles/field-assembler.css']
})
export class FieldAssemblerComponent implements OnInit, OnDestroy {

	@Input()
	peerType: PeerType;

	@Input()
	gameNodeService: GameNodeService;

	hexMap: HexMap;

	private destroy = new EventEmitter();

	constructor(
		private gameFieldService: GameFieldService,
		private gameScenarioService: GameScenarioService) {}


	confirmFieldAssembled(): void {
		this.gameScenarioService.nextGameState();

		this.gameNodeService.broadcast(GameEvent.CHANGE_STATE, this.gameScenarioService.gameState);
	}

	ngOnInit(): void {

		this.hexMap = this.gameFieldService.generateField();
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
