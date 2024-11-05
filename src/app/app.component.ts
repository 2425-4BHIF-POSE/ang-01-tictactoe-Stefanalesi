import {Component, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly gameOutcome: WritableSignal<number> = signal(0);
  protected readonly boardState: WritableSignal<number[][]> = signal([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  protected readonly currentPlayer: WritableSignal<number> = signal(-1);

  public togglePlayer() {
    this.currentPlayer.update(current => (current === -1 ? 1 : -1));
  }

  protected makeMove(row: number, col: number) {
    if (this.gameOutcome() !== 0) return;
    this.boardState.update(board => {
      if (board[row][col] === 0) {
        board[row][col] = this.currentPlayer();
        this.togglePlayer();
        this.gameOutcome.set(this.evaluateOutcome(board));
      }
      return board;
    });
  }

  protected resetBoard() {
    this.gameOutcome.set(0);
    this.boardState.update(board => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j] = 0;
        }
      }
      return board;
    });
  }

  private evaluateOutcome(board: number[][]): number {
    for (let i = 0; i < 3; i++) {
      const rowTotal = board[i][0] + board[i][1] + board[i][2];
      const colTotal = board[0][i] + board[1][i] + board[2][i];
      if (rowTotal === 3 || colTotal === 3) return 1;
      if (rowTotal === -3 || colTotal === -3) return -1;
    }

    const diag1Total = board[0][0] + board[1][1] + board[2][2];
    const diag2Total = board[0][2] + board[1][1] + board[2][0];
    if (diag1Total === 3 || diag2Total === 3) return 1;
    if (diag1Total === -3 || diag2Total === -3) return -1;

    if (board.every(row => row.every(cell => cell !== 0))) return 404;

    return 0;
  }
}
