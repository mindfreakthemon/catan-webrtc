import { InjectionToken } from '@angular/core';
import { GameConfiguration } from './game/models/game-configuration';
import { GameFieldConfiguration } from './game-field/models/game-field-configuration';

export const GAME_CONFIGURATION = new InjectionToken<GameConfiguration>('gameConfiguration');
export const GAME_FIELD_CONFIGURATION = new InjectionToken<GameFieldConfiguration>('gameFieldConfiguration');
