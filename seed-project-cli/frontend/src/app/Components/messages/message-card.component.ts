import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent {
  @Input() message: any;
  @Input() showActions: boolean = true;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.message._id);
  }

  onDelete() {
    this.delete.emit(this.message._id);
  }
}
