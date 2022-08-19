import { describe, expect, it } from "vitest";
import { PuzzleCreator } from '../src/puzzle.creator';

describe("Create a puzzle", () => {
    it('Should give correct bounds for a 4x4 puzzle', () => {
        const puzzleType = 'puzzle.4x4';
        const result = PuzzleCreator.setupPuzzle(puzzleType);

        expect(result.getBounds()).toStrictEqual([4, 4])
    });
});
