import { GameState } from '../enums/game-state.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class GameScenarioService {

	gameState: GameState = GameState.START;

	nextGameState(): void {
		this.gameState = this.nextState(this.gameState);
	}

	resetGameState(state: GameState = GameState.START): void {
		this.gameState = state;
	}

	private nextState(currentState: GameState): GameState {
		switch (currentState) {
			case GameState.START:
				return GameState.CHOOSE_ROLE;

			case GameState.CHOOSE_ROLE:
				return GameState.CHOOSE_NAME;

			case GameState.CHOOSE_NAME:
				return GameState.LOBBY;

			case GameState.LOBBY:
				return GameState.CHOOSE_PLAYER_TOKEN;

			case GameState.CHOOSE_PLAYER_TOKEN:
				return GameState.ASSEMBLE_FIELD;

			case GameState.ASSEMBLE_FIELD:
				return GameState.ROLL_DICE;

			case GameState.ROLL_DICE:
				return GameState.END;

			default:
				return GameState.ERROR;
		}
	}
}
