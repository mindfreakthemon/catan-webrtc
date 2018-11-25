import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GameScenarioService } from './game-scenario/services/game-scenario.service';
import { PlayerModule } from '../player/player.module';
import { PeerModule } from '../peer/peer.module';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { PLAYERS_CONSTRAINTS } from '../player/player.config';
import { GAME_CONFIGURATION, GAME_FIELD_CONFIGURATION } from './game.config';
import { GameTokenSelectorComponent } from './game-token-selector/game-token-selector.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { GameSlaveService } from './game/services/game-slave.service';
import { GameMasterService } from './game/services/game-master.service';
import { GameFieldAssemblerComponent } from './game-field-assembler/game-field-assembler.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameFieldCellComponent } from './game-field/game-field-cell.component';
import { GameFieldCellSideComponent } from './game-field/game-field-cell-side.component';
import { GameFieldService } from './game-field/services/game-field.service';
import { GameFieldCellHouseComponent } from './game-field/game-field-cell-house.component';
import { GameWelcomeScreenComponent } from './game-welcome-screen/game-welcome-screen.component';
import { GameDiceRollerScreenComponent } from './game-dice-roller/game-dice-roller-screen.component';
import { GameDiceRollerComponent } from './game-dice-roller/game-dice-roller.component';
import { GameContextService } from './game/services/game-context.service';
import { GameDiceRollerSelectorComponent } from './game-dice-roller/game-dice-roller-selector.component';
import { GamePlayerOrderService } from './game-player-order/services/game-player-order.service';

export * from './game.dependencies';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		// CommonModule,
		PeerModule,
		PlayerModule
	],

	declarations: [
		GameLobbyComponent,
		GameScreenComponent,
		GameFieldComponent,
		GameWelcomeScreenComponent,
		GameTokenSelectorComponent,
		GameFieldAssemblerComponent,
		GameFieldCellComponent,
		GameFieldCellSideComponent,
		GameFieldCellHouseComponent,
		GameDiceRollerComponent,
		GameDiceRollerScreenComponent,
		GameDiceRollerSelectorComponent
	],

	providers: [
		{
			provide: GAME_CONFIGURATION,
			useValue: {
				minPlayers: 2,
				maxPlayers: 6,
				cardsPerStack: 25
			}
		},
		{
			provide: PLAYERS_CONSTRAINTS,
			useValue: {
				playerLimit: 6
			}
		},
		{
			provide: GAME_FIELD_CONFIGURATION,
			useValue: {
				size: 7
			}
		},
		GameMasterService,
		GameSlaveService,
		GameScenarioService,
		GameFieldService,
		GameContextService,
		GamePlayerOrderService
	],

	exports: [
		GameLobbyComponent,
		GameScreenComponent,
		GameFieldComponent,
		GameTokenSelectorComponent,
		GameFieldAssemblerComponent
	]
})
export class GameModule {
}
