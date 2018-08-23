import { Component, EventEmitter, Injector } from '@angular/core';
import { PeerType } from '../modules/peer/peer/enums/peer-type.enum';
import { GameState } from '../modules/game/game-scenario/enums/game-state.enum';
import { GameScenarioService } from '../modules/game/game-scenario/services/game-scenario.service';
import { Broadcast } from '../modules/player/player/enums/broadcast.enum';
import { GameNodeService } from '../modules/game/game/services/game-node.service';
import { GameMasterService } from '../modules/game/game/services/game-master.service';
import { GameSlaveService } from '../modules/game/game/services/game-slave.service';
import 'rxjs/add/operator/takeUntil';
import { GameEvent } from '../modules/game/game/enums/game-event.enum';

@Component({
	moduleId: module.id,
	selector: 'main',
	templateUrl: 'tmpl/main.html',
	styleUrls: ['styles/main.css']
})
export class MainComponent {

	PeerType: typeof PeerType = PeerType;

	GameState: typeof GameState = GameState;

	gameNodeService: GameNodeService;

	peerType: PeerType;

	private destroy = new EventEmitter();

	constructor(
		private gameScenarioService: GameScenarioService,
		private injector: Injector
	) {
	}

	setupPeer(peerType: PeerType): void {
		this.peerType = peerType;

		if (this.gameNodeService) {
			this.gameNodeService.destroy();
		}

		switch (peerType) {
			case PeerType.MASTER:
				this.gameNodeService = this.injector.get(GameMasterService);

				break;

			case PeerType.SLAVE:
				this.gameNodeService = this.injector.get(GameSlaveService);

				break;

			default:
				return;
		}

		this.gameNodeService.connect();

		this.gameNodeService.playerNodeService.addBroadcastListener(Broadcast.PLAYER_EJECTED)
			.takeUntil(this.destroy)
			.subscribe((peerId) => {
				if (this.gameNodeService.id === peerId) {
					this.destroyPeer();
				}
			});

		this.gameNodeService.addGameEventListener(GameEvent.CHANGE_STATE)
			.takeUntil(this.destroy)
			.subscribe((gameState) => this.gameScenarioService.resetGameState(gameState));

		this.gameScenarioService.nextGameState();
	}

	handlePlayerCreated(): void {
		this.gameScenarioService.nextGameState();
	}

	destroyPeer(): void {
		this.destroy.emit();
		this.gameNodeService.destroy();
		this.gameNodeService = null;

		this.gameScenarioService.resetGameState();
	}

}
