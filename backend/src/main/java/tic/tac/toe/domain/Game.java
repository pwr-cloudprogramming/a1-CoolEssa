package tic.tac.toe.domain;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Game {
    private String noughtsPlayerName;
    private String crossesPlayerName;
    private GameState gameState;
    private Field field;

    public Game(final Game game) {
        noughtsPlayerName = game.noughtsPlayerName;
        crossesPlayerName = game.crossesPlayerName;
        gameState = game.gameState;
        field = game.field;
    }

    public Game(final String noughtsPlayerName) {
        this.noughtsPlayerName = noughtsPlayerName;
        gameState = GameState.GAME_NOT_STARTED;
        field = new Field();
    }
}
