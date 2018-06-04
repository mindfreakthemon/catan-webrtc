import { InjectionToken } from '@angular/core';
import { GameConfiguration } from './game/models/game-configuration';

export const GAME_CONFIGURATION = new InjectionToken<GameConfiguration>('gameConfiguration');
