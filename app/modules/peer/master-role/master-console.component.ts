import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { PeerMasterService } from '../peer/services/peer-master.service';
import 'rxjs/add/operator/takeUntil';

@Component({
	moduleId: module.id,
	selector: 'master-console',
	templateUrl: 'tmpl/master-console.html',
	styleUrls: ['styles/master-console.css']
})
export class MasterConsoleComponent implements OnDestroy, OnInit {

	private destroy = new EventEmitter();

	constructor(
		public peerMasterService: PeerMasterService,
		public ref: ChangeDetectorRef) {
	}

	close(connection: PeerJs.DataConnection): void {
		this.peerMasterService.close(connection);
	}

	ngOnInit(): void {
		this.peerMasterService.connectionBeacon
			.takeUntil(this.destroy)
			.subscribe(() => this.ref.detectChanges());
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
