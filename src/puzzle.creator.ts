import PuzzleFactory from '@PauldeKoning/sudoku/dist/model/puzzle.factory';
import Puzzle from '@PauldeKoning/sudoku/dist/model/puzzle.abstract';

export class PuzzleCreator {
  static setupPuzzle(type: string): Puzzle {
    return PuzzleFactory.getFactory().createPuzzle(type);
  }
}
