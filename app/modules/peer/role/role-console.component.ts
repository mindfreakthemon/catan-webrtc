import { Component, EventEmitter, Output } from '@angular/core';
import { PeerType } from '../peer/enums/peer-type.enum';

@Component({
	moduleId: module.id,
	selector: 'role-console',
	templateUrl: 'tmpl/role-console.html',
	styleUrls: ['styles/role-console.css']
})
export class RoleConsoleComponent {

	@Output()
	peer = new EventEmitter<PeerType>();

	chooseMaster(): void {
		this.peer.emit(PeerType.MASTER);
	}

	chooseSlave(): void {
		this.peer.emit(PeerType.SLAVE);
	}
}
