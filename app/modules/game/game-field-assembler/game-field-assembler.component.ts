import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { GameNodeService } from '../game/services/game-node.service';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';
import { GameEvent } from '../game/enums/game-event.enum';
import { GameFieldService } from '../game-field/services/game-field.service';

@Component({
	moduleId: module.id,
	selector: 'game-field-assembler',
	templateUrl: 'tmpl/game-field-assembler.html',
	styleUrls: ['styles/game-field-assembler.css']
})
export class GameFieldAssemblerComponent implements OnInit, OnDestroy {

	@Input()
	peerType: PeerType;

	@Input()
	gameNodeService: GameNodeService;

	sizeCoefficient: number = 4;

	private destroy = new EventEmitter();

	constructor(
		private gameFieldService: GameFieldService,
		private gameScenarioService: GameScenarioService) {}

	confirmFieldAssembled(): void {
		this.gameScenarioService.nextGameState();

		this.gameNodeService.broadcast(GameEvent.CHANGE_STATE, this.gameScenarioService.getGameState());
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
