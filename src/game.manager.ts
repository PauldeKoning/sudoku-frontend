import { PuzzleCreator } from './puzzle.creator';
import { Renderer } from './renderer';
import Puzzle from '@PauldeKoning/sudoku/dist/model/puzzle.interface';
import { CellState } from '@PauldeKoning/sudoku/dist/model/cell.state.enum';
import { PuzzleStrings } from '@PauldeKoning/sudoku/dist/puzzles/puzzle.strings';
import Cell from '@PauldeKoning/sudoku/dist/model/cell';

export enum DisplayState {
  ALL,
  DEFINITIVE
}

export class GameManager {
  private puzzle: Puzzle;
  private puzzleName: string;
  private displayState = DisplayState.ALL;
  private cellState = CellState.DRAFT;
  private selectedNumber = 1;
  private invalidCells: Cell[] = [];

  constructor(type: string) {
    this.puzzle = PuzzleCreator.setupPuzzle(type);
    this.puzzleName = type;
  }

  public setCellState(isDraft: boolean) {
    this.cellState = isDraft ? CellState.DRAFT : CellState.DEFINITIVE;
    this.puzzle.getPuzzle().changeCellState(this.cellState);
    this.renderControls();
  }

  public setDisplayState(showDraft: boolean) {
    this.displayState = showDraft ? DisplayState.ALL : DisplayState.DEFINITIVE;
    this.renderGame();
  }

  public renderGame() {
    this.renderPuzzle();
    this.renderControls();
  }

  private renderPuzzle() {
    Renderer.drawPuzzle(this.puzzle, this.displayState, this.invalidCells);
    this.addPuzzleListeners();
  }

  private renderControls() {
    Renderer.drawControls(this.puzzleName, Object.keys(PuzzleStrings), this.cellState, this.displayState, this.puzzle.getNumRange(), this.selectedNumber);
    this.addControlListeners();
  }

  private setSelectedNumber(n: number) {
    if (n < 0 || n > 9) throw Error('Invalid number to insert');

    this.selectedNumber = n;
    this.renderControls();
  }

  private insertNumber(x: number, y: number) {
    this.puzzle.getPuzzle().setCell(x, y, this.selectedNumber);
    this.validatePuzzle();
  }

  private checkGameFinished() {
    if (this.invalidCells.length === 0) {
      alert('Game finished');
    }
  }

  private validatePuzzle() {
    this.invalidCells = this.puzzle.getPuzzle().validate();
    this.renderPuzzle();
    this.checkGameFinished();
  }

  private solvePuzzle() {
    Renderer.setLoadingState(true);

    // Make use of the JavaScript event loop.
    // By delaying it by a cycle the browser can render the new loading state before waiting on the long computation.
    setTimeout(() => {
      if (this.puzzle.solve()) {
        this.validatePuzzle();
      } else {
        alert('Puzzle unsolvable in current state!')
      }
      Renderer.setLoadingState(false);
    }, 10);
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
    this.addPuzzleSelectorListener();
    this.addDraftModeListener();
    this.addDisplayModeListener();
    this.addSolvePuzzleListener();
    this.addNumberRowListener();
  }

  private selectNewPuzzle(type: string) {
    const params = new URLSearchParams(document.location.search);
    params.set('type', type);
    window.history.replaceState('', '', '?' + params.toString());

    this.puzzle = PuzzleCreator.setupPuzzle(type);
    this.puzzleName = type;
    this.puzzle.getPuzzle().changeCellState(this.cellState);
    this.renderGame();
  }

  private addPuzzleSelectorListener() {
    const puzzleSelect = document.querySelector('#puzzleSelector') as HTMLSelectElement;
    if (!puzzleSelect) throw Error('Missing puzzle selector');

    puzzleSelect.addEventListener('change', () => {
      const type = puzzleSelect.value;

      const confirmation = confirm(`Do you want to switch to ${type}?`);
      if (!confirmation) {
        puzzleSelect.value = this.puzzleName;
        return;
      }

      this.selectNewPuzzle(type);
    });
  }

  private addDisplayModeListener() {
    const displayModeCheckbox = document.querySelector('#displayMode') as HTMLInputElement;
    if (!displayModeCheckbox) throw Error('Missing display mode checkbox');

    displayModeCheckbox.addEventListener('change', () => {
      this.setDisplayState(displayModeCheckbox.checked);
    });
  }

  private addDraftModeListener() {
    const draftModeCheckbox = document.querySelector('#draftMode') as HTMLInputElement;
    if (!draftModeCheckbox) throw Error('Missing draft mode checkbox');

    draftModeCheckbox.addEventListener('change', () => {
      this.setCellState(draftModeCheckbox.checked);
    });
  }

  private addSolvePuzzleListener() {
    const solveBtn = document.querySelector('#solvePuzzle');
    if (!solveBtn) throw Error('Missing solve button');

    solveBtn.addEventListener('click', () => {
      const confirmation = confirm('Do you really want to automatically solve this puzzle? \n\nThis might take a while depending on the puzzle type!');

      if (confirmation) this.solvePuzzle();
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