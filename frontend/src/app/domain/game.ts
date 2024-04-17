import { Field } from "./field";
import { GameState } from "./game-state";

export interface Game {
    noughtsPlayerName: String;
    crossesPlayerName: String;
    gameState: GameState;
    field: Field;
}