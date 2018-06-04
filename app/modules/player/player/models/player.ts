import { PeerId } from '../../../peer/peer/models/peer-id';

export interface Player {
	name: string;

	peerId?: PeerId;
}
