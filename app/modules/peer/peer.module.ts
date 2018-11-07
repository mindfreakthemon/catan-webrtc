import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MasterConsoleComponent } from './master-role/master-console.component';
import { SlaveConsoleComponent } from './slave-role/slave-console.component';
import { SignalingConsoleComponent } from './signaling/signaling-console.component';
import { RoleConsoleComponent } from './role/role-console.component';
import { PeerSlaveService } from './peer/services/peer-slave.service';
import { PeerMasterService } from './peer/services/peer-master.service';
import { PEER_CONFIG } from './peer.config';

export * from './peer.exports';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule
	],

	declarations: [
		MasterConsoleComponent,
		SlaveConsoleComponent,
		SignalingConsoleComponent,
		RoleConsoleComponent
	],

	providers: [
		{
			provide: PEER_CONFIG,
			useValue: {
				host: 'peerjs.middle-of-nowhere.name',
				port: 443,
				secure: true,
				debug: 3,
				reliable: true
			}
		},
		PeerMasterService,
		PeerSlaveService
	],

	exports: [
		MasterConsoleComponent,
		SlaveConsoleComponent,
		SignalingConsoleComponent,
		RoleConsoleComponent
	]
})
export class PeerModule {
}
