import { PeerNodeService } from './peer-node.service';
import { PEER_CONFIG } from '../../peer.config';
import { Inject, Injectable, NgZone } from '@angular/core';

@Injectable()
export class PeerSlaveService extends PeerNodeService {

	connection: PeerJs.DataConnection;

	queue: any[] = [];

	get isMasterConnected(): boolean {
		return this.connection ? this.connection.open : false;
	}

	constructor(
		@Inject(PEER_CONFIG)
		public peerConfig: PeerJs.PeerJSOption,
		ngZone: NgZone
	) {

		super(ngZone);
	}

	connect(): void {
		if (this.peer) {
			this.destroy();
		}

		this.peer = new Peer(this.peerConfig);

		this.peer.on('open', (id) => this.handleSignalingConnect(id));
		this.peer.on('disconnected', () => this.handleSignalingDisconnect());

		this.peer.on('error', (error) => this.handleError(error));

		this.masterReconnect();

		super.connect();
	}

	// region handlers

	handleMasterConnect(): void {
		console.log('connected to master');

		this.connectionBeacon.emit();

		this.queue.forEach((data) => this.connection.send(data));
	}

	handleMasterDisconnect(): void {
		console.log('disconnected to master');

		this.connectionBeacon.emit();
	}

	// endregion

	masterReconnect(): void {
		this.connection = this.peer.connect('master');

		this.connection.on('open', () => this.handleMasterConnect());
		this.connection.on('error', (error) => this.handleError(error));
		this.connection.on('close', () => this.handleMasterDisconnect());
		this.connection.on('data', (data) => this.handleData('master', data));
	}

	masterDisconnect(): void {
		this.connection.close();
	}

	broadcast(data: any): void {
		if (this.connection.open) {
			this.connection.send(data);
		} else {
			this.queue.push(data);
		}
	}
}
