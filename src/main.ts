import './style.css';
import { GameManager } from './game.manager';

try {
  const params = new URLSearchParams(document.location.search);
  let puzzleType = params.get('type') ?? 'puzzle.9x9';

  const manager = new GameManager(puzzleType);
  manager.renderGame();
} catch (e) {
  alert(e);
}
