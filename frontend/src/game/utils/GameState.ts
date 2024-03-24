import gameChars from './gameChars';

interface GameState {
  gameStatus: gameChars[];
  setGameStatus: (newGameStatus: gameChars[]) => void;

  getGameCell: (index: number) => gameChars;

  isPlayerTurn: boolean;
  setIsPlayerTurn: (isPlayerOneTurn: boolean) => void;

  isPlayerPlayerOne: boolean;
  setIsPlayerPlayerOne: (isPlayerPlayerOne: boolean) => void;

  areBothPlayersIn: boolean;
  setAreBothPlayersIn: (areBothPlayersIn: boolean) => void;

  isGameOver: boolean;
  setIsGameOver: (gameStatus: gameChars[]) => void;

  endGameStatus: GameStatus | null;
  setEndGameStatus: (endGameStatus: GameStatus) => void;
}

const PLAYER_ONE_WINS = "playerOneWins";
const PLAYER_TWO_WINS = "playerTwoWins";
const DRAW = "draw";
type GameStatus = typeof PLAYER_ONE_WINS | typeof PLAYER_TWO_WINS | typeof DRAW;

export default GameState;
