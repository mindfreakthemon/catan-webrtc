import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { PeerSlaveService } from '../peer/services/peer-slave.service';
import 'rxjs-compat/operators/takeUntil';

@Component({
	moduleId: module.id,
	selector: 'slave-console',
	templateUrl: 'tmpl/slave-console.html',
	styleUrls: ['styles/slave-console.css']
})
export class SlaveConsoleComponent implements OnDestroy, OnInit {

	private destroy = new EventEmitter();

	constructor(
		public peerSlaveService: PeerSlaveService,
		public ref: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.peerSlaveService.connectionBeacon
			.takeUntil(this.destroy)
			.subscribe(() => this.ref.detectChanges());
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
