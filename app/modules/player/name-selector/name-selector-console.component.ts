import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerNodeService } from '../player/services/player-node.service';
import { Player } from '../player/models/player';

@Component({
	moduleId: module.id,
	selector: 'name-selector-console',
	templateUrl: 'tmpl/name-selector-console.html',
	styleUrls: ['styles/name-selector-console.css']
})
export class NameSelectorConsoleComponent {

	@Input()
	playerNodeService: PlayerNodeService;

	@Output()
	player = new EventEmitter<Player>();

	name: string = 'test';

	createPlayer(): void {
		this.playerNodeService.registerPlayer({ name: this.name })
			.then((success) => {

				if (success) {
					this.player.emit();
				}
			});
	}
}
