import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-board-component',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() value!: number;
  @Output() cellClick = new EventEmitter<void>();

  onCellClick(): void {
    this.cellClick.emit();
  }
}
