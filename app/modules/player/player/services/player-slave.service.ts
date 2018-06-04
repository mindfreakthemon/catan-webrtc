import { Inject, Injectable } from '@angular/core';
import { PeerSlaveService } from '../../../peer/peer/services/peer-slave.service';
import { PlayerNodeService } from './player-node.service';
import { Player } from '../models/player';
import { PeerId } from '../../../peer/peer/models/peer-id';
import { PlayersConstraints } from '../models/players-constraints';
import { PLAYERS_CONSTRAINTS } from '../../player.config';
import { PlayerNodeCall } from '../models/player-node-call';

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

	registerPlayer(player: Player): Promise<boolean> {
		return this.requestMaster('registerPlayer', player);
	}

	unregisterPlayer(peerId: PeerId): Promise<boolean> {
		return Promise.resolve(false);
	}

	sendGameEvent(data: any): void {
		/* noop */
	}

	getAllPlayers(): Promise<any> {
		return this.requestMaster('getAllPlayers');
	}

	requestMaster(method: string, ...args: any[]): Promise<any> {
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
