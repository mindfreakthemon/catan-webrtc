import { Inject, Injectable } from '@angular/core';
import { PlayerNodeService } from './player-node.service';
import { Player } from '../models/player';
import { PlayersConstraints } from '../models/players-constraints';
import { PLAYERS_CONSTRAINTS } from '../../player.config';
import { PlayerNodeCall } from '../models/player-node-call';
import { PeerId, PeerSlaveService } from '../../player.dependencies';

@Injectable()
export class PlayerSlaveService extends PlayerNodeService {

	private requests: PlayerNodeCall[] = [];

	constructor(
		@Inject(PLAYERS_CONSTRAINTS)
		public playersConstraints: PlayersConstraints,
		public peerNodeService: PeerSlaveService) {

		super(playersConstraints, peerNodeService);

		this.events
			.subscribe(({ data }) => this.handleData(data));
	}

	public registerPlayer(player: Player): Promise<boolean> {
		return this.requestMaster('registerPlayer', player);
	}

	public unregisterPlayer(peerId: PeerId): Promise<boolean> {
		return Promise.resolve(false);
	}

	public getAllPlayers(): Promise<any> {
		return this.requestMaster('getAllPlayers');
	}

	public requestMaster(method: string, ...args: any[]): Promise<any> {
		return new Promise((resolve) => {
			this.peerNodeService.broadcast({ method, args });
			this.requests.push({ method, resolve });
		});
	}

	private handleData(data: any): void {
		if (data.method) {
			this.requests = this.requests
				.filter((request) => {
					if (request.method === data.method) {
						request.resolve(data.data);

						return false;
					}

					return true;
				});
		}
	}
}
