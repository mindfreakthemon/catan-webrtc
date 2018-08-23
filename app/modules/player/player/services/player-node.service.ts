import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Broadcast } from '../enums/broadcast.enum';
import { Observable } from 'rxjs/Observable';
import { Player } from '../models/player';
import { PeerNodeService } from '../../../peer/peer/services/peer-node.service';
import { PlayersConstraints } from '../models/players-constraints';
import { PLAYERS_CONSTRAINTS } from '../../player.config';
import { PeerId } from '../../../peer/peer/models/peer-id';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export abstract class PlayerNodeService {

	get events(): EventEmitter<any> {
		return this.peerNodeService.dataBeacon;
	}

	get id(): PeerId {
		return this.peerNodeService.id;
	}

	protected constructor(
		@Inject(PLAYERS_CONSTRAINTS)
		public playersConstraints: PlayersConstraints,
		public peerNodeService: PeerNodeService
	) {
	}

	connect(): void {
		this.peerNodeService.connect();
	}

	destroy(): void {
		this.peerNodeService.destroy();
	}

	abstract registerPlayer(player: Player): Promise<boolean>;

	abstract unregisterPlayer(peerId: PeerId): void;

	abstract sendGameEvent(data: any): void;

	abstract getAllPlayers(): Promise<Player[]>;

	addBroadcastListener(broadcast: Broadcast): Observable<any> {
		return this.events
			.filter((event) => event.data.broadcast === broadcast)
			.map((event) => event.data.data);
	}
}
