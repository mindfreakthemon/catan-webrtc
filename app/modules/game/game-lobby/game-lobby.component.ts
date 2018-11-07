import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';
import { GameNodeService } from '../game/services/game-node.service';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';
import { GameEvent } from '../game/enums/game-event.enum';
import { Broadcast, PeerId, Player } from '../game.dependencies';

@Component({
	moduleId: module.id,
	selector: 'game-lobby',
	templateUrl: 'tmpl/game-lobby.html',
	styleUrls: ['styles/game-lobby.css']
})
export class GameLobbyComponent implements OnInit, OnDestroy {

	PeerType = PeerType;

	@Input()
	gameNodeService: GameNodeService;

	@Input()
	peerType: PeerType = PeerType.SLAVE;

	private destroy = new EventEmitter();

	private players: Player[];

	constructor(private gameScenarioService: GameScenarioService) {}

	ejectPlayer(peerId: PeerId): void {
		this.gameNodeService.playerNodeService.unregisterPlayer(peerId);
	}

	start(): void {
		this.gameScenarioService.nextGameState();

		this.gameNodeService.broadcast(GameEvent.CHANGE_STATE, this.gameScenarioService.getGameState());
	}

	ngOnInit(): void {
		this.gameNodeService.playerNodeService.getAllPlayers()
			.then((players) => this.players = players);

		this.gameNodeService.playerNodeService.addBroadcastListener(Broadcast.PLAYER_DISCONNECTED)
			.takeUntil(this.destroy)
			.subscribe((peerId) => this.gameNodeService.playerNodeService.unregisterPlayer(peerId));

		this.gameNodeService.playerNodeService.addBroadcastListener(Broadcast.PLAYER_LIST_UPDATED)
			.takeUntil(this.destroy)
			.subscribe((players) => this.players = players);
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
