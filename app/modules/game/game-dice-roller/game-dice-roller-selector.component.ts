import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { GameContextService } from '../game/services/game-context.service';
import { GameDiceRoll } from './models/game-dice-roll';
import { GameEvent } from '../game/enums/game-event.enum';
import { PeerId, Player } from '../game.dependencies';

@Component({
	moduleId: module.id,
	selector: 'game-dice-roller-selector',
	templateUrl: 'tmpl/game-dice-roller-selector.html',
	styleUrls: ['styles/game-dice-roller-selector.css']
})
export class GameDiceRollerSelectorComponent implements OnInit, OnDestroy {

	private destroy = new EventEmitter();

	private players: Player[];

	private playerStartDiceRolls: Map<PeerId, GameDiceRoll>;

	constructor(
		private gameContextService: GameContextService) {}

	handleStateUpdate(values: [PeerId, GameDiceRoll][]): void {
		this.playerStartDiceRolls = new Map(values);
	}

	ngOnInit(): void {
		this.gameContextService.getService().playerNodeService.getAllPlayers()
			.then((players) => this.players = players);

		this.gameContextService.getService().getPlayerStartDiceRoll()
			.then((playerStartDiceRolls) => this.handleStateUpdate(playerStartDiceRolls));

		this.gameContextService.getService().addGameEventListener<[PeerId, GameDiceRoll][]>(GameEvent.PLAYER_START_DICE_ROLL_UPDATE)
			.takeUntil(this.destroy)
			.subscribe((playerStartDiceRolls) => this.handleStateUpdate(playerStartDiceRolls));
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
