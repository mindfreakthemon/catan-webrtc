import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { PlayerNodeService } from '../../player/player/services/player-node.service';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';
import { GameNodeService } from '../game/services/game-node.service';
import { GameState } from '../game-scenario/enums/game-state.enum';
import { GameEvent } from '../game/enums/game-event.enum';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';

@Component({
	moduleId: module.id,
	selector: 'game-screen',
	templateUrl: 'tmpl/game-screen.html',
	styleUrls: ['styles/game-screen.css']
})
export class GameScreenComponent implements OnInit, OnDestroy {

	GameState = GameState;

	@Input()
	gameNodeService: GameNodeService;

	@Input()
	peerType: PeerType;

	private destroy = new EventEmitter();

	constructor(private gameScenarioService: GameScenarioService) {}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
