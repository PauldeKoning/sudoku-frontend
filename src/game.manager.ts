import {PuzzleCreator} from "./puzzle.creator";
import {Renderer} from "./renderer";

export class GameManager {
    initGame() {
        const puzzle = PuzzleCreator.setupPuzzle('puzzle.samurai');
        Renderer.draw(puzzle);
        this.addListeners()

    }

    private addListeners() {
        const boxes = document.querySelectorAll(".puzzleCell");
        console.log("Boxes", boxes);

        boxes.forEach(b => {
            b.addEventListener("click", (e) => {
                const cell = e.target as HTMLTableCellElement;
                const cellValue = Number(cell.innerText);
                const xPos = Number(cell.dataset.x);
                const yPos = Number(cell.dataset.y);

                console.log("Clicked on cell with xPos:", xPos, "and yPos:", yPos, "and value:", cellValue, cell);
            })
        })
    }
}