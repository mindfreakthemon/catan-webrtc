import { NgModule } from '@angular/core';
import { PlayerMasterService } from './player/services/player-master.service';
import { PlayerSlaveService } from './player/services/player-slave.service';
import { PeerModule } from '../peer/peer.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NameSelectorConsoleComponent } from './name-selector/name-selector-console.component';
import { PLAYERS_CONSTRAINTS } from './player.config';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		PeerModule
	],

	declarations: [
		NameSelectorConsoleComponent
	],

	providers: [
		{
			provide: PLAYERS_CONSTRAINTS,
			useValue: {
				playerLimit: 2
			}
		},
		PlayerMasterService,
		PlayerSlaveService
	],

	exports: [
		NameSelectorConsoleComponent
	]
})
export class PlayerModule {
}
