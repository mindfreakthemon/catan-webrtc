import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GameScenarioService } from './game-scenario/services/game-scenario.service';
import { PlayerModule } from '../player/player.module';
import { LobbyComponent } from './lobby/lobby.component';
import { PLAYERS_CONSTRAINTS } from '../player/player.config';
import { GAME_CONFIGURATION, GAME_FIELD_CONFIGURATION } from './game.config';
import { TokenSelectorConsoleComponent } from './token-selector/token-selector-console.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { GameSlaveService } from './game/services/game-slave.service';
import { GameMasterService } from './game/services/game-master.service';
import { FieldAssemblerComponent } from './field-assembler/field-assembler.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameFieldCellComponent } from './game-field/game-field-cell.component';
import { GameFieldCellSideComponent } from './game-field/game-field-cell-side.component';
import { GameFieldService } from './game-field/services/game-field.service';
import { GameFieldCellHouseComponent } from './game-field/game-field-cell-house.component';

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
		GameFieldCellComponent,
		GameFieldCellSideComponent,
		GameFieldCellHouseComponent
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
		{
			provide: GAME_FIELD_CONFIGURATION,
			useValue: {
				size: 7
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
