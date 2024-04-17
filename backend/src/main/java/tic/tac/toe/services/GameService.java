package tic.tac.toe.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tic.tac.toe.domain.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class GameService {
    private final Map<Integer, Game> games = new HashMap<>();

    @Autowired
    private final GameFieldValidator gameFieldValidator;

    public Game startGame(PlayerData playerData) {
        final Game game;

        if (games.containsKey(playerData.getGameId())) {
            game = games.get(playerData.getGameId());

            if (GameState.GAME_NOT_STARTED.equals(game.getGameState()) && !Objects.equals(game.getNoughtsPlayerName(), playerData.getPlayerName())) {
                game.setCrossesPlayerName(playerData.getPlayerName());
                game.setGameState(GameState.NOUGHTS_TURN);
            }
        } else {
            game = new Game(playerData.getPlayerName());
            games.put(playerData.getGameId(), game);
        }
        return game;
    }

    public Game currentGameState(final PlayerData playerData) {
        return games.getOrDefault(playerData.getGameId(), null);
    }

    public Game setMove(final Move move) {
        if (games.containsKey(move.getGameId())) {
            final Game game = games.get(move.getGameId());
            game.setField(move.getField());
            game.setGameState(gameFieldValidator.getCurrentGameState(move.getField(), move.getPlayer()));
            return game;
        } else {
            return null;
        }
    }

    public Game restart(final int gameId) {
        if (games.containsKey(gameId)) {
            final Game game = games.get(gameId);
            game.setField(new Field());
            game.setGameState(GameState.NOUGHTS_TURN);
            return game;
        } else {
            return null;
        }
    }
}
