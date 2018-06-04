import { Directive, EventEmitter, HostListener, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { DragNDropStorage } from './drag-n-drop.storage';

@Directive({
	selector: '[droppable]'
})
export class DroppableDirective {
	@Input()
	droppableId: string = 'default';

	@Output()
	dropBeacon = new EventEmitter<DragEvent>();

	constructor(
		public renderer: Renderer2,
		public vcRef: ViewContainerRef
	) {
	}

	@HostListener('drop', ['$event'])
	handleDrop(event: DragEvent): void {
		if (this.hasIncorrectID()) {
			return;
		}

		event.stopPropagation();

		this.dropBeacon.emit(event);

		this.handleDragLeave();
	}

	@HostListener('dragenter', ['$event'])
	handleDragEnter(event?: DragEvent): void {
		if (this.hasIncorrectID()) {
			return;
		}

		if (event) {
			event.stopPropagation();
		}

		this.renderer.addClass(this.vcRef.element.nativeElement, 'droppable');
	}

	@HostListener('dragexit', ['$event'])
	handleDragExit(event: DragEvent): void {
		if (this.hasIncorrectID()) {
			return;
		}

		this.handleDragLeave();
	}

	@HostListener('dragleave', ['$event'])
	handleDragLeave(event?: DragEvent): void {
		if (this.hasIncorrectID()) {
			return;
		}

		if (event) {
			event.stopPropagation();
		}

		this.renderer.removeClass(this.vcRef.element.nativeElement, 'droppable');
	}

	@HostListener('dragover', ['$event'])
	handleDragOver(event: DragEvent): void {
		if (this.hasIncorrectID()) {
			return;
		}

		event.dataTransfer.dropEffect = 'move';

		event.preventDefault();
		event.stopPropagation();

		this.handleDragEnter();
	}

	hasIncorrectID(): boolean {
		return DragNDropStorage.DRAG_N_DROP_CURRENT_ID !== this.droppableId;
	}
}
