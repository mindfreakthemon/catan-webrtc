import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Input } from '@angular/core';
import { PeerNodeService } from '../peer/services/peer-node.service';
import { PeerType } from '../peer/enums/peer-type.enum';
import 'rxjs-compat/operators/takeUntil';

@Component({
	moduleId: module.id,
	selector: 'signaling-console',
	templateUrl: 'tmpl/signaling-console.html',
	styleUrls: ['styles/signaling-console.css']
})
export class SignalingConsoleComponent implements OnDestroy, OnInit {

	private destroy = new EventEmitter();

	@Input()
	private peerNodeService: PeerNodeService;

	@Input()
	private peerType: PeerType;

	constructor(private ref: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.peerNodeService.signalingBeacon
			.takeUntil(this.destroy)
			.subscribe(() => this.ref.detectChanges());
	}

	ngOnDestroy(): void {
		this.destroy.emit();
		this.destroy.complete();
	}
}
