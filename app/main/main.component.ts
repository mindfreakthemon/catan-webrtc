import { Component, EventEmitter, Injector } from '@angular/core';
import { PeerType } from '../modules/peer/peer/enums/peer-type.enum';
import { GameState } from '../modules/game/game-scenario/enums/game-state.enum';
import { GameScenarioService } from '../modules/game/game-scenario/services/game-scenario.service';
import { Broadcast } from '../modules/player/player/enums/broadcast.enum';
import { GameNodeService } from '../modules/game/game/services/game-node.service';
import { GameMasterService } from '../modules/game/game/services/game-master.service';
import { GameSlaveService } from '../modules/game/game/services/game-slave.service';
import 'rxjs-compat/operators/takeUntil';
import { GameEvent } from '../modules/game/game/enums/game-event.enum';
import { GameContextService } from '../modules/game/game/services/game-context.service';
import { PlayerToken } from '../modules/game/game/enums/player-token.enum';

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
		private gameContextService: GameContextService,
		private gameScenarioService: GameScenarioService,
		private injector: Injector
	) {
		// @TODO remove
		this.setupPeer(PeerType.MASTER);
		this.gameNodeService.playerNodeService.registerPlayer({ name: 'nice' });
		this.gameNodeService.registerPlayerToken(PlayerToken.BLUE);
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

		this.gameContextService.setService(this.gameNodeService);

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

		// this.gameScenarioService.nextGameState();
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
