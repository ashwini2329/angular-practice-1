import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() message: string = 'Are you sure you want to proceed?';
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleYes() {
    this.onConfirm.emit(true);
  }

  handleNo() {
    this.onConfirm.emit(false);
  }
}
