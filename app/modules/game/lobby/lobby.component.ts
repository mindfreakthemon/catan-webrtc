import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Broadcast } from '../../player/player/enums/broadcast.enum';
import { Player } from '../../player/player/models/player';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';
import { PeerId } from '../../peer/peer/models/peer-id';
import { GameNodeService } from '../game/services/game-node.service';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';
import { GameEvent } from '../game/enums/game-event.enum';

@Component({
	moduleId: module.id,
	selector: 'lobby',
	templateUrl: 'tmpl/lobby.html',
	styleUrls: ['styles/lobby.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

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

		this.gameNodeService.broadcast(GameEvent.CHANGE_STATE, this.gameScenarioService.gameState);
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
