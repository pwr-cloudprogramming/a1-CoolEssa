import { Field } from "./field";
import { FieldState } from "./field-state";

export interface Move {
    field: Field;
    gameId: number;
    player: FieldState;
}