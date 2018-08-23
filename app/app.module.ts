import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { RootComponent } from './modules/common/root/root.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from './modules/common/common.module';
import { PeerModule } from './modules/peer/peer.module';
import { PlayerModule } from './modules/player/player.module';
import { GameModule } from './modules/game/game.module';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		CommonModule,
		PeerModule,
		PlayerModule,
		GameModule
	],

	declarations: [
		MainComponent
	],

	providers: [],

	bootstrap: [
		RootComponent
	]
})
export class AppModule {
}
