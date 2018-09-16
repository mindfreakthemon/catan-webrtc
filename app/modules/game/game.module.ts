import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GameScenarioService } from './game-scenario/services/game-scenario.service';
import { PlayerModule } from '../player/player.module';
import { LobbyComponent } from './lobby/lobby.component';
import { PLAYERS_CONSTRAINTS } from '../player/player.config';
import { GAME_CONFIGURATION } from './game.config';
import { TokenSelectorConsoleComponent } from './token-selector/token-selector-console.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { GameSlaveService } from './game/services/game-slave.service';
import { GameMasterService } from './game/services/game-master.service';
import { FieldAssemblerComponent } from './field-assembler/field-assembler.component';
import { GameFieldService } from './game-field/services/game-field.service';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameCellComponent } from './game-field/game-cell.component';
import { GameCellSideComponent } from './game-field/game-cell-side.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		PlayerModule
	],

	declarations: [
		LobbyComponent,
		GameScreenComponent,
		GameFieldComponent,
		TokenSelectorConsoleComponent,
		FieldAssemblerComponent,
		GameCellComponent,
		GameCellSideComponent
	],

	providers: [
		{
			provide: GAME_CONFIGURATION,
			useValue: {
				minPlayers: 2,
				maxPlayers: 6
			}
		},
		{
			provide: PLAYERS_CONSTRAINTS,
			useValue: {
				playerLimit: 6
			}
		},
		GameMasterService,
		GameSlaveService,
		GameScenarioService,
		GameFieldService
	],

	exports: [
		LobbyComponent,
		GameScreenComponent,
		GameFieldComponent,
		TokenSelectorConsoleComponent,
		FieldAssemblerComponent
	]
})
export class GameModule {
}
