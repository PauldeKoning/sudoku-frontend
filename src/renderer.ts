import {Puzzle} from "@PauldeKoning/sudoku/dist/model/puzzle.factory";

export class Renderer {
    static draw(puzzle: Puzzle) {
        console.log(puzzle);
        console.log(puzzle.getBounds())

        const [xBound, yBound] = puzzle.getBounds();
        console.log(xBound, yBound);

        // Create y amount of TR's
        // TR's contain X amount of TD's

        let sudokuRows = "";
        for (let i = 0; i < yBound; i++) {
            sudokuRows += "<tr>";
            for (let j = 0; j < xBound; j++) {
                const cellValue = puzzle.getPuzzle().getCell(j, i);
                if (cellValue === -1)  {
                    sudokuRows += `<td></td>`
                } else {
                    const bgColor = this.getSeededColor(j);
                    sudokuRows += `<td class="puzzleCell" data-x="${j}" data-y="${i}" style="background-color: #${bgColor}">${cellValue === 0 ? "" : cellValue }</td>`
                }
            }
            sudokuRows += "</tr>";
        }

        document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
          <div>
            <table>
                ${sudokuRows}
            </table>
          </div>
        `
    }

    static getSeededColor(seed: number): string {
        let color = Math.floor((Math.abs(Math.sin(seed) * 16777215))).toString(16);
        // pad any colors shorter than 6 characters with leading 0s
        return color.padStart(6, "0");
    }
}
