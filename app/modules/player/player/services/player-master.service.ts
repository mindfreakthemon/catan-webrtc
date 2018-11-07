import { Inject, Injectable } from '@angular/core';
import { PlayerNodeService } from './player-node.service';
import { Broadcast } from '../enums/broadcast.enum';
import { Player } from '../models/player';
import { PLAYERS_CONSTRAINTS } from '../../player.config';
import { PlayersConstraints } from '../models/players-constraints';
import { PlayerNodeCall } from '../models/player-node-call';
import { PeerId, PeerMasterService } from '../../player.dependencies';

@Injectable()
export class PlayerMasterService extends PlayerNodeService {

	private players = new Map<PeerId, Player>();

	constructor(
		@Inject(PLAYERS_CONSTRAINTS)
		public playersConstraints: PlayersConstraints,
		public peerNodeService: PeerMasterService
	) {
		super(playersConstraints, peerNodeService);

		this.peerNodeService.disconnectingBeacon
			.subscribe((peerId) => this.handleDisconnect(peerId));

		this.events
			.subscribe(({ peer, data }) => this.handleData(peer, data));
	}

	public broadcast(broadcast: Broadcast, data: any): void {
		this.peerNodeService.broadcast({ broadcast, data });
	}

	public registerPlayer(player: Player, peerId: PeerId = this.id): Promise<boolean> {
		if (this.players.has(peerId)) {
			return Promise.resolve(true);
		}

		if (this.players.size >= this.playersConstraints.playerLimit) {
			return Promise.resolve(false);
		}

		player.peerId = peerId;

		this.players.set(peerId, player);

		this.broadcast(Broadcast.PLAYER_LIST_UPDATED, Array.from(this.players.values()));

		return Promise.resolve(true);
	}

	public unregisterPlayer(peerId: PeerId): void {
		this.players.delete(peerId);

		this.broadcast(Broadcast.PLAYER_EJECTED, peerId);

		this.broadcast(Broadcast.PLAYER_LIST_UPDATED, Array.from(this.players.values()));
	}

	public getAllPlayers(): Promise<Player[]> {
		return Promise.resolve(Array.from(this.players.values()));
	}

	private handleData(peerId: PeerId, data: PlayerNodeCall): void {
		if (data.method) {
			const method = data.method;

			if (this[method]) {
				this[method](...data.args, peerId)
					.then((response) => this.peerNodeService.send(peerId, { method, data: response }));
			}
		}
	}

	private handleDisconnect(peerId: PeerId): void {
		this.broadcast(Broadcast.PLAYER_DISCONNECTED, peerId);
	}

}
