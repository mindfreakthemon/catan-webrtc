import { GameState } from '../enums/game-state.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class GameScenarioService {

	private gameState: GameState = GameState.START_DICE_ROLL;

	public nextGameState(): void {
		this.gameState = this.nextState(this.gameState);
	}

	public resetGameState(state: GameState = GameState.START): void {
		this.gameState = state;
	}

	public getGameState(): GameState {
		return this.gameState;
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
				return GameState.START_DICE_ROLL;

			case GameState.START_DICE_ROLL:
				return GameState.END;

			default:
				return GameState.ERROR;
		}
	}
}
