import { EventEmitter, NgZone } from '@angular/core';
import { PeerId } from '../models/peer-id';

export abstract class PeerNodeService {

	id: PeerId;

	peer: PeerJs.Peer;

	selectingBeacon = new EventEmitter();

	destroyingBeacon = new EventEmitter();

	signalingBeacon = new EventEmitter();

	connectionBeacon = new EventEmitter();

	disconnectingBeacon = new EventEmitter<PeerId>();

	connectingBeacon = new EventEmitter<PeerId>();

	dataBeacon = new EventEmitter();

	constructor(protected ngZone: NgZone) {}

	get isSignalingConnected(): boolean {
		return !this.peer.disconnected;
	}

	// region handlers

	handleError(error: ErrorEvent): void {
		console.error(error);

		switch (error.type) {
			case 'peer-unavailable':
				break;

			case 'socket-closed':
				break;
		}
	}

	handleData(peerId: PeerId, data: any): void {
		console.log('received data from %s: %j', peerId, data);

		this.ngZone.run(() => this.dataBeacon.emit({ peer: peerId, data }));
	}

	handleSignalingConnect(peerId: PeerId): void {
		console.log('connected to signaling server as %s', peerId);

		this.id = peerId;

		this.signalingBeacon.emit();
	}

	handleSignalingDisconnect(): void {
		console.log('disconnected from signaling server');

		this.signalingBeacon.emit();
	}

	// endregion

	connect(): void {
		this.selectingBeacon.emit();
	}

	signalingReconnect(): void {
		this.peer.reconnect();
	}

	signalingDisconnect(): void {
		this.peer.disconnect();
	}

	destroy(): void {
		this.peer.destroy();

		this.destroyingBeacon.emit();
	}

	abstract broadcast(data: any): void;
}
