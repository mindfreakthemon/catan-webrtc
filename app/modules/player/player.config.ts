import { InjectionToken } from '@angular/core';
import { PlayersConstraints } from './player/models/players-constraints';

export const PLAYERS_CONSTRAINTS = new InjectionToken<PlayersConstraints>('playersConstraints');
