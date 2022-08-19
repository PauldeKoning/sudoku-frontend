import PuzzleFactory from '@PauldeKoning/sudoku/dist/model/puzzle.factory';
import Puzzle from '@PauldeKoning/sudoku/dist/model/puzzle.interface';

export class PuzzleCreator {
  static setupPuzzle(type: string): Puzzle {
    return new PuzzleFactory().createPuzzle(type);
  }
}
