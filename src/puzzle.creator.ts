import PuzzleFactory, {Puzzle} from "@PauldeKoning/sudoku/dist/model/puzzle.factory";

export class PuzzleCreator {
  static setupPuzzle(type: string): Puzzle {
    return new PuzzleFactory().createPuzzle(type);
  }
}
