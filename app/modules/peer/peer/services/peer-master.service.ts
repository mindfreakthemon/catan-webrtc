import { Inject, Injectable, NgZone } from '@angular/core';
import { PeerNodeService } from './peer-node.service';
import { PEER_CONFIG } from '../../peer.config';

@Injectable()
export class PeerMasterService extends PeerNodeService {

	connections: PeerJs.DataConnection[] = [];

	constructor(
		@Inject(PEER_CONFIG)
			private peerConfig: PeerJs.PeerJSOption,
			ngZone: NgZone) {

		super(ngZone);
	}

	connect(): void {
		if (this.peer) {
			this.destroy();
		}

		this.peer = new Peer('master', this.peerConfig);

		this.peer.on('open', (id) => this.handleSignalingConnect(id));
		this.peer.on('disconnected', () => this.handleSignalingDisconnect());

		this.peer.on('connection', (connection) => this.handleConnection(connection));
		this.peer.on('error', (error) => this.handleError(error));

		super.connect();
	}

	// region handlers

	handleConnection(connection: PeerJs.DataConnection): void {
		this.connections.push(connection);

		console.log('receiving a connect from %s', connection.peer, connection.open);

		connection.on('open', () => this.handleOpen(connection));
		// connection.on('error', () => { debugger });
	}

	handleOpen(connection): void {
		connection.on('data', (data) => this.handleData(connection.peer, data));
		connection.on('close', () => this.handleClose(connection));

		console.log('connected to %s', connection.peer);

		this.ngZone.run(() => this.connectingBeacon.emit(connection.peer));
		this.connectionBeacon.emit();
	}

	handleClose(connection: PeerJs.DataConnection): void {
		this.connections.splice(this.connections.indexOf(connection), 1);

		this.ngZone.run(() => this.disconnectingBeacon.emit(connection.peer));
		this.connectionBeacon.emit();
	}

	// endregion

	send(peer: string, data: any): void {
		this.connections.forEach((connection) => {
			if (connection.peer === peer) {
				connection.send(data);
			}
		});
	}

	close(connection: PeerJs.DataConnection): void {
		if (connection.open) {
			connection.close();
		} else {
			/* connection wasn't initiated, force... */
			this.handleClose(connection);
		}
	}

	broadcast(data: any): void {
		this.connections.forEach((connection) => connection.send(data));

		this.dataBeacon.emit({ peer: 'master', data });
	}
}
