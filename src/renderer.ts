import Puzzle from '@PauldeKoning/sudoku/dist/model/puzzle.interface';
import { CellState } from '@PauldeKoning/sudoku/dist/model/cell.state.enum';

export class Renderer {
  static drawPuzzle(puzzle: Puzzle) {
    const [xBound, yBound] = puzzle.getBounds();

    let sudokuRows = '';
    for (let i = 0; i < yBound; i++) {
      sudokuRows += '<tr>';
      for (let j = 0; j < xBound; j++) {
        const cell = puzzle.getPuzzle().getCell(j, i);

        if (!cell) {
          sudokuRows += `<td></td>`;
        } else {
          const cellValue = cell.value;
          const draftValues = Array.from(cell.draftValues).sort((a, b) => a - b);
          const draftString = draftValues.reduce((prev, curr) => prev + curr, '');
          const bgColor = this.getSeededColor(cell.boxNr);

          sudokuRows += `<td class='puzzleCell' data-x='${j}' data-y='${i}' style='background-color: ${'#' + bgColor}'>
                              <div class='content'>
                                  <sup>${draftString}</sup>
                                  <span>${cellValue === 0 ? '' : cellValue}</span>
                              </div>
                          </td>`;
        }
      }
      sudokuRows += '</tr>';
    }

    document.querySelector<HTMLDivElement>('#puzzle')!.innerHTML = `
          <div>
            <table>
                ${sudokuRows}
            </table>
          </div>
        `;
  }

  static drawControls(cellState: CellState, selectedNumber: number) {
    const controlDiv = document.querySelector<HTMLDivElement>('#controls')!;
    let numberBtns = '';
    for (let i = 1; i < 10; i++) {
      numberBtns += `<button ${i === selectedNumber ? 'class=\'active\'' : ''}>${i}</button>`;
    }

    controlDiv.innerHTML = `
            <div id='stateRow'>
                <input type='checkbox' name='draftMode' ${cellState === CellState.DRAFT ? 'checked' : ''} id='draftMode'><label for='draftMode'>Draft mode</label>
            </div>
            <div id='numberRow'>
                ${numberBtns}
          </div>
        `;

    document.querySelector<HTMLDivElement>('body')!.appendChild(controlDiv);
  }

  static getSeededColor(seed: number): string {
    let color = Math.floor((Math.abs(Math.sin(seed) * 16777215))).toString(16);
    // pad any colors shorter than 6 characters with leading 0s
    return color.padStart(6, '0');
  }
}
