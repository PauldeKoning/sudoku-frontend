import { describe, expect, it } from 'vitest';
import { GameManager } from '../src/game.manager';

describe('Create a game', () => {
  it('Should initialize a new puzzle', () => {
    const puzzleType = 'puzzle.4x4';
    const result = new GameManager(puzzleType);

    expect(result).toBeInstanceOf(GameManager);
  });
});
