import { Directive, EventEmitter, HostListener, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { DragNDropStorage } from './drag-n-drop.storage';

@Directive({
	selector: '[draggable]'
})
export class DraggableDirective {
	@Input()
	draggableId: string = 'default';

	@Output()
	dragBeacon = new EventEmitter<DragEvent>();

	constructor(
		public renderer: Renderer2,
		public vcRef: ViewContainerRef
	) {
	}

	@HostListener('dragstart', ['$event'])
	handleDragStart(event: DragEvent) {
		event.stopPropagation();

		this.renderer.addClass(this.vcRef.element.nativeElement, 'draggable');

		DragNDropStorage.DRAG_N_DROP_CURRENT_ID = this.draggableId;

		this.dragBeacon.emit(event);
	}

	@HostListener('dragend', ['$event'])
	handleDragStop(event: DragEvent) {
		event.stopPropagation();

		this.renderer.removeClass(this.vcRef.element.nativeElement, 'draggable');

		// DragNDropStorage.DRAG_N_DROP_CURRENT_ID = 'default';
	}
}
