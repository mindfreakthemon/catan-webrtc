import { PeerId } from '../../player.dependencies';

export interface Player {
	name: string;

	peerId?: PeerId;
}
