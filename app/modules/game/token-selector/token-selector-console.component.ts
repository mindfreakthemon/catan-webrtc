import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { PlayerToken } from '../game/enums/player-token.enum';
import { GameNodeService } from '../game/services/game-node.service';
import { Player } from '../../player/player/models/player';
import { GameEvent } from '../game/enums/game-event.enum';
import { PeerId } from '../../peer/peer/models/peer-id';
import { PeerType } from '../../peer/peer/enums/peer-type.enum';
import { GameScenarioService } from '../game-scenario/services/game-scenario.service';

@Component({
	moduleId: module.id,
	selector: 'token-selector-console',
	templateUrl: 'tmpl/token-selector-console.html',
	styleUrls: ['styles/token-selector-console.css']
})
export class TokenSelectorConsoleComponent implements OnInit, OnDestroy {

	PeerType = PeerType;

	PlayerToken = PlayerToken;

	playerTokenKeys: string[] = Object.keys(PlayerToken);

	@Input()
	peerType: PeerType;

	@Input()
	gameNodeService: GameNodeService;

	players: Player[];

	playerTokens: Map<PlayerToken, PeerId>;

	private destroy = new EventEmitter();

	constructor(private gameScenarioService: GameScenarioService) {}

	handleStateUpdate(values: any[]): void {
		this.playerTokens = new Map(values.map((args) => args.reverse()));
	}

	isTakenBy(token: string): string {
		return this.playerTokens.get(PlayerToken[token]);
	}

	selectToken(token: string): void {
		/* should block */

		this.gameNodeService.registerPlayerToken(PlayerToken[token])
			.then((success) => {
				if (success) {

				}
			});
	}

	confirmTokenSelection(): void {
		this.gameScenarioService.nextGameState();

		this.gameNodeService.broadcast(GameEvent.CHANGE_STATE, this.gameScenarioService.gameState);
	}

	ngOnInit(): void {
		this.gameNodeService.playerNodeService.getAllPlayers()
			.then((players) => this.players = players);

		this.gameNodeService.getPlayerTokens()
			.then((playerTokens) => this.handleStateUpdate(playerTokens));

		this.gameNodeService.addGameEventListener(GameEvent.PLAYER_TOKEN_LIST_UPDATE)
			.takeUntil(this.destroy)
			.subscribe((playerTokens) => this.handleStateUpdate(playerTokens));
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
