import { PuzzleCreator } from './puzzle.creator';
import { Renderer } from './renderer';
import Puzzle from '@PauldeKoning/sudoku/dist/model/puzzle.interface';
import { CellState } from '@PauldeKoning/sudoku/dist/model/cell.state.enum';

export class GameManager {
  private readonly puzzle: Puzzle;
  private cellState = CellState.DRAFT;
  private selectedNumber = 1;

  constructor(type: string) {
    this.puzzle = PuzzleCreator.setupPuzzle(type);
    this.renderGame();
  }

  public setCellState(isDraft: boolean) {
    this.cellState = isDraft ? CellState.DRAFT : CellState.DEFINITIVE;
    this.puzzle.getPuzzle().changeCellState(this.cellState);
    this.renderControls();
  }

  public setSelectedNumber(n: number) {
    if (n < 0 || n > 9) throw Error('Invalid number to insert');

    this.selectedNumber = n;
    this.renderControls();
  }

  private renderGame() {
    this.renderPuzzle();
    this.renderControls();
  }

  private renderPuzzle() {
    Renderer.drawPuzzle(this.puzzle);
    this.addPuzzleListeners();
  }

  private renderControls() {
    Renderer.drawControls(this.cellState, this.selectedNumber);
    this.addControlListeners();
  }

  private insertNumber(x: number, y: number) {
    this.puzzle.getPuzzle().setCell(x, y, this.selectedNumber);
    this.renderPuzzle();
  }

  private addPuzzleListeners() {
    const boxes = document.querySelectorAll('.puzzleCell');

    boxes.forEach(b => {
      b.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const cell = target.closest('.puzzleCell') as HTMLElement;

        const xPos = Number(cell.dataset.x);
        const yPos = Number(cell.dataset.y);

        this.insertNumber(xPos, yPos);
      });
    });
  }

  private addControlListeners() {
    this.addDraftModeListener();
    this.addNumberRowListener();
  }

  private addDraftModeListener() {
    const draftModeCheckbox = document.querySelector('#draftMode') as HTMLInputElement;
    if (!draftModeCheckbox) throw Error('Missing draft mode checkbox');

    draftModeCheckbox.addEventListener('change', () => {
      this.setCellState(draftModeCheckbox.checked);
    });
  }

  private addNumberRowListener() {
    const numberRow = document.querySelector('#numberRow');
    if (!numberRow) throw Error('Missing number row');

    numberRow.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const selectedNumber = Number(target.innerText);

      this.setSelectedNumber(selectedNumber);
    });
  }
}